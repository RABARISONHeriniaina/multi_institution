// app/institutions/[id]/register/page.tsx
'use client'

import { useState, useEffect, createElement } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Loader2, UserPlus, User, Lock, ChevronRight, ChevronLeft, Check, Calendar as CalendarIcon } from 'lucide-react'
import { toast } from 'sonner'

interface StudentFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  gender: string
  dateOfBirth: Date | undefined
  phoneNumber: string
}

interface FormErrors {
  [key: string]: string
}

interface Address {
  street: string | null
  address: string | null
  postal_code: string | null
  country: string | null
  city: string | null
  lat: number | null
  lng: number | null
}

interface Institution {
  id: string
  name: string
  slug: string
  brandColor: string
  description: string
  website: string
  createdAt: string
  updatedAt: string
  logo: string
  address: Address
}

const STEPS = [
  { id: 1, title: 'Informations Personnelles', icon: User },
  { id: 2, title: 'Compte et Finalisation', icon: Lock }
]

export default function StudentRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const institutionId = params.id as string

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInstitution, setIsLoadingInstitution] = useState(true)
  const [errors, setErrors] = useState<FormErrors>({})
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: undefined,
    phoneNumber: ''
  })

  // Fetch institution data
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutions/${institutionId}`)

        if (response.ok) {
          const institutionData = await response.json()
          setInstitution(institutionData)
        } else {
          // Fallback if API doesn't exist yet
          setInstitution({ 
            id: institutionId, 
            name: `Institution ${institutionId}`,
            slug: '',
            brandColor: '#000000',
            description: '',
            website: '',
            createdAt: '',
            updatedAt: '',
            logo: '',
            address: {
              street: null,
              address: null,
              postal_code: null,
              country: null,
              city: null,
              lat: null,
              lng: null
            }
          })
        }
      } catch (error) {
        console.error('Failed to fetch institution:', error)
        setInstitution({ 
          id: institutionId, 
          name: `Institution ${institutionId}`,
          slug: '',
          brandColor: '#000000',
          description: '',
          website: '',
          createdAt: '',
          updatedAt: '',
          logo: '',
          address: {
            street: null,
            address: null,
            postal_code: null,
            country: null,
            city: null,
            lat: null,
            lng: null
          }
        })
      } finally {
        setIsLoadingInstitution(false)
      }
    }

    fetchInstitution()
  }, [institutionId])

  const handleInputChange = (field: keyof StudentFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    switch (step) {
      case 1:
        const step1Fields = ['firstName', 'lastName', 'gender', 'email', 'phoneNumber']
        for (const field of step1Fields) {
          if (!formData[field as keyof StudentFormData]) {
            newErrors[field] = `${getFieldLabel(field)} est requis`
            isValid = false
          }
        }
        // Date of birth validation
        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = 'Date de naissance est requise'
          isValid = false
        }
        // Email validation
        if (formData.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Veuillez entrer une adresse email valide'
            isValid = false
          }
        }
        break
      case 2:
        if (!formData.password) {
          newErrors.password = 'Le mot de passe est requis'
          isValid = false
        } else if (formData.password.length < 6) {
          newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
          isValid = false
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'La confirmation du mot de passe est requise'
          isValid = false
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
          isValid = false
        }
        break
    }

    setErrors(newErrors)
    return isValid
  }

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse email',
      phoneNumber: 'Numéro de téléphone',
      gender: 'Sexe',
      dateOfBirth: 'Date de naissance',
      password: 'Mot de passe',
      confirmPassword: 'Confirmation du mot de passe'
    }
    return labels[field] || field
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
    if (!validateStep(2)) return

    setIsLoading(true)
    setErrors({})

    try {
      const { confirmPassword, ...submitData } = formData
      
      // Convert date to string format for API
      const apiData = {
        ...submitData,
        dateOfBirth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : '',
        institutionId: institutionId // Add institution ID to the payload
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Institution-ID': institutionId
        },
        body: JSON.stringify(apiData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur HTTP! statut: ${response.status}`)
      }

      const result = await response.json()
      
      toast.success('Étudiant enregistré avec succès!', {
        description: `Inscription réussie pour ${formData.firstName} ${formData.lastName}`
      })

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: undefined,
        phoneNumber: ''
      })
      setCurrentStep(1)
      setErrors({})

    } catch (error) {
      console.error('Erreur d\'enregistrement:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Échec de l\'enregistrement de l\'étudiant. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Entrez le nom"
                  className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Entrez le prénom"
                  className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gender">Sexe *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.gender ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder="Sélectionnez le sexe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculin</SelectItem>
                    <SelectItem value="female">Féminin</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal transition-all focus:ring-2 focus:ring-primary/20 ${
                        !formData.dateOfBirth ? "text-muted-foreground" : ""
                      } ${errors.dateOfBirth ? 'border-red-500 focus:border-red-500' : ''}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? (
                        format(formData.dateOfBirth, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionnez une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) => handleInputChange('dateOfBirth', date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="etudiant@exemple.com"
                  className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Numéro de téléphone *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+261 34 12 345 67"
                  className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.phoneNumber ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Entrez un mot de passe sécurisé (min. 6 caractères)"
                className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmation du mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirmez votre mot de passe"
                className={`transition-all focus:ring-2 focus:ring-primary/20 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
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

  if (isLoadingInstitution) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span>Chargement des informations de l'institution...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header with Institution Branding */}
        <div className="mb-8 text-center">
          {/* Institution Logo */}
          {institution?.logo && (
            <div className="mx-auto mb-4 flex justify-center">
              <img 
                src={institution.logo} 
                alt={`${institution.name} logo`}
                className="h-16 w-16 rounded-full object-cover border-2 border-primary/20 shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
          
          {/* Fallback Icon if no logo or logo fails to load */}
          {!institution?.logo && (
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
          )}

          <h1 className="mb-2 text-3xl font-bold text-foreground">Inscription Étudiant</h1>
          <p className="text-muted-foreground">
            Enregistrez-vous au sein de l'établissement : <strong style={{ color: institution?.brandColor || 'inherit' }}>{institution?.name}</strong>
          </p>
          
          {/* Institution Details */}
          {institution?.description && (
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              {institution.description}
            </p>
          )}
          
          {/* Address */}
          {institution?.address?.address && (
            <p className="mt-1 text-xs text-muted-foreground">
              📍 {institution.address.address}
              {institution.address.city && `, ${institution.address.city}`}
              {institution.address.country && `, ${institution.address.country}`}
            </p>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-md mx-auto">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`
                        flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200
                        ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                          isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                          'border-muted-foreground/30 bg-background text-muted-foreground'}
                      `}
                      style={isActive && institution?.brandColor ? { 
                        borderColor: institution.brandColor, 
                        backgroundColor: institution.brandColor 
                      } : {}}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <span className={`mt-2 text-sm font-medium text-center max-w-[120px] leading-tight ${
                      isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                    style={isActive && institution?.brandColor ? { color: institution.brandColor } : {}}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < STEPS.length - 1 && (
                    <div className={`h-px w-24 mx-6 transition-colors duration-200 ${
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
                  style={institution?.brandColor ? {
                    background: `linear-gradient(to right, ${institution.brandColor}, ${institution.brandColor}90)`
                  } : {}}
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
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      S'Inscrire
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