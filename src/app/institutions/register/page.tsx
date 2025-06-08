'use client'

import { useState, createElement } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Building2, Mail, MapPin, ChevronRight, ChevronLeft, Check, Globe, Users, Image, Upload, X, UserPlus, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface InstitutionFormData {
  name: string
  description: string
  website: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  logo: File | null
  logoPreview: string
  brandColor: string
  contactPersonName: string
  contactPersonFirstName: string
  contactPersonEmail: string
  contactPersonPhone: string
}

interface FormErrors {
  [key: string]: string
}

const STEPS = [
  { id: 1, title: 'Informations Générales', icon: Building2 },
  { id: 2, title: 'Compte Administrateur', icon: UserPlus },
  { id: 3, title: 'Adresse et Localisation', icon: MapPin }
]

export default function InstitutionRegistrationPage() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: '',
    description: '',
    website: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Madagascar',
    logo: null,
    logoPreview: '',
    brandColor: '',
    contactPersonName: '',
    contactPersonFirstName: '',
    contactPersonEmail: '',
    contactPersonPhone: ''
  })

  const handleInputChange = (field: keyof InstitutionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          logo: file,
          logoPreview: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setFormData(prev => ({ 
        ...prev, 
        logo: null,
        logoPreview: ''
      }))
    }
    // Clear field-specific error when user uploads a file
    if (errors.logo) {
      setErrors(prev => ({ ...prev, logo: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Le nom de l\'institution est requis'
          isValid = false
        }
        if (!formData.description.trim()) {
          newErrors.description = 'La description est requise'
          isValid = false
        }
        break
      case 2:
        if (!formData.contactPersonName.trim()) {
          newErrors.contactPersonName = 'Le nom de l\'administrateur est requis'
          isValid = false
        }
        if (!formData.contactPersonFirstName.trim()) {
          newErrors.contactPersonFirstName = 'Le prénom de l\'administrateur est requis'
          isValid = false
        }
        if (!formData.contactPersonEmail.trim()) {
          newErrors.contactPersonEmail = 'L\'email de connexion est requis'
          isValid = false
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(formData.contactPersonEmail)) {
            newErrors.contactPersonEmail = 'Veuillez entrer une adresse email valide'
            isValid = false
          }
        }
        break
      case 3:
        if (!formData.address.trim()) {
          newErrors.address = 'L\'adresse est requise'
          isValid = false
        }
        if (!formData.city.trim()) {
          newErrors.city = 'La ville est requise'
          isValid = false
        }
        break
    }

    setErrors(newErrors)
    return isValid
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
    }
  }

  const prevStep = () => {
    setErrors({})
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/institutions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur HTTP! statut: ${response.status}`)
      }

      const result = await response.json()
      
      toast.success('Institution enregistrée avec succès!', {
        description: `${formData.name} a été ajoutée au système`
      })

      // Reset form
      setFormData({
        name: '',
        description: '',
        website: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Madagascar',
        logo: null,
        logoPreview: '',
        brandColor: '',
        contactPersonName: '',
        contactPersonFirstName: '',
        contactPersonEmail: '',
        contactPersonPhone: ''
      })
      setCurrentStep(1)
      setErrors({})

      // Redirect to institutions list or dashboard
      setTimeout(() => {
        router.push('/institutions')
      }, 2000)

    } catch (error) {
      console.error('Erreur d\'enregistrement:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Échec de l\'enregistrement de l\'institution. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'établissement *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Université de Madagascar"
                className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Décrivez brièvement l'établissement, sa mission et ses spécialités..."
                className={`min-h-[100px] transition-all focus:ring-2 focus:ring-primary/20 ${errors.description ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Site web</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.institution.mg"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo *</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="logo-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
                    >
                      {formData.logoPreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={formData.logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              handleFileChange(null)
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, GIF (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          if (file && file.size > 5 * 1024 * 1024) {
                            setErrors(prev => ({ ...prev, logo: 'Le fichier ne doit pas dépasser 5MB' }))
                            return
                          }
                          handleFileChange(file)
                        }}
                      />
                    </label>
                  </div>
                  {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandColor">Thème</Label>
                <Input
                  id="brandColor"
                  type="text"
                  placeholder='#FE95DD'
                  value={formData.brandColor}
                  onChange={(e) => handleInputChange('brandColor', e.target.value)}
                  className="transition-all w-50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Création du compte administrateur</h4>
                  <p className="text-sm text-muted-foreground">
                    Ce compte permettra à l'administrateur de l'école de se connecter et de gérer l'établissement. 
                    Les informations saisies serviront d'identifiants de connexion pour accéder au tableau de bord.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/30 p-4">
              <h4 className="mb-3 font-semibold text-foreground flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                Informations de l'administrateur
              </h4>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactPersonName">Nom de l'administrateur *</Label>
                  <Input
                    id="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                    placeholder="Rakoto"
                    className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.contactPersonName ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.contactPersonName && <p className="text-sm text-red-500">{errors.contactPersonName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPersonFirstName">Prénom de l'administrateur *</Label>
                  <Input
                    id="contactPersonFirstName"
                    value={formData.contactPersonFirstName}
                    onChange={(e) => handleInputChange('contactPersonFirstName', e.target.value)}
                    placeholder="Jean"
                    className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.contactPersonFirstName ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.contactPersonFirstName && <p className="text-sm text-red-500">{errors.contactPersonFirstName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPersonEmail">Email de connexion *</Label>
                  <Input
                    id="contactPersonEmail"
                    type="email"
                    value={formData.contactPersonEmail}
                    onChange={(e) => handleInputChange('contactPersonEmail', e.target.value)}
                    placeholder="admin@institution.mg"
                    className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.contactPersonEmail ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.contactPersonEmail && <p className="text-sm text-red-500">{errors.contactPersonEmail}</p>}
                  <p className="text-xs text-muted-foreground">
                    Cette adresse email sera utilisée pour se connecter au système
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPersonPhone">Téléphone de contact</Label>
                  <Input
                    id="contactPersonPhone"
                    type="tel"
                    value={formData.contactPersonPhone}
                    onChange={(e) => handleInputChange('contactPersonPhone', e.target.value)}
                    placeholder="+261 34 12 345 67"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Note importante :</strong> Un email de confirmation avec le mot de passe temporaire 
                    sera envoyé à l'adresse indiquée. L'administrateur pourra modifier ce mot de passe lors de sa première connexion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adresse complète *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Lot II M 42 Ter, Ankatso, Antananarivo 101"
                className={`min-h-[80px] transition-all focus:ring-2 focus:ring-primary/20 ${errors.address ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Antananarivo"
                  className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.city ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Province/Région</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Analamanga"
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="101"
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Madagascar"
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Enregistrez votre établissement</h1>
          <p className="text-muted-foreground">
            Ajouter une nouvelle établissement éducative au système
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex max-w-md mx-auto items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200
                      ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                        isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                        'border-muted-foreground/30 bg-background text-muted-foreground'}
                    `}>
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium text-center max-w-[120px] ${
                      isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < STEPS.length - 1 && (
                    <div className={`h-px w-16 mx-4 transition-colors duration-200 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-muted-foreground/30'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              {createElement(STEPS[currentStep - 1].icon, { className: "h-6 w-6 text-primary" })}
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Étape {currentStep} sur {STEPS.length} - Remplissez les informations ci-dessous
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 mt-6 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-2.5"
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>

              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 px-6 py-2.5"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-2.5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enregistrement en cours...
                    </>
                  ) : (
                    <>
                      <Building2 className="h-4 w-4" />
                      Enregistrer l'établissement
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}