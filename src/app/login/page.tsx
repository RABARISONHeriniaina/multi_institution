'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter, redirect } from 'next/navigation';


import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, Eye, EyeOff, Building2, ArrowRight, KeyRound, GraduationCap } from 'lucide-react'

interface LoginFormData {
  email: string
  password: string
}

interface FormErrors {
  [key: string]: string
}

export default function LoginForm() {

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const router = useRouter();

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est requise'
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Veuillez entrer une adresse email valide'
        isValid = false
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Le mot de passe est requis'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = async () => {
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          const errorData = await response.json()
          setErrors({ submit: errorData.message || 'Identifiants invalides' })
          return
        }

        const { token, refresh_token } = await response.json()

        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_refresh_token', refresh_token)

        window.location.href = '/admin/institutions'

      } catch (error) {
        setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' })
      } finally {
        setIsLoading(false)
    }

  }

  useEffect(() => {
     const token = localStorage.getItem('auth_token')
     if (token) {
        window.location.href = '/admin/institutions'
     }
  }, [])

  const handleForgotPassword = async () => {
    
    if (!formData.email.trim()) {
      setErrors({ email: 'Veuillez entrer votre adresse email' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: 'Veuillez entrer une adresse email valide' })
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Un lien de réinitialisation a été envoyé à votre adresse email')
      setShowForgotPassword(false)
    } catch (error) {
      setErrors({ submit: 'Erreur lors de l\'envoi. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSchoolRegistration = () => {
    router.push('/institutions/register')
  }

  const handleStudentRegistration = () => {
    router.push('/institutions')
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Mot de passe oublié</h1>
            <p className="text-muted-foreground">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                      className={`pl-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {errors.submit && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.submit}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Envoyer le lien
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full"
                  >
                    Retour à la connexion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Connexion</h1>
          <p className="text-muted-foreground">
            Connectez-vous à votre compte pour accéder au tableau de bord
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.com"
                    className={`pl-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {errors.submit && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              <Button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-border"></div>
              <div className="px-4 text-xs text-muted-foreground">OU</div>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg bg-muted/30 border border-muted-foreground/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Nouveau établissement ?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Inscrivez-vous pour commencer à utiliser notre plateforme.
                    </p>
                    <Button
                      type="button"
                      onClick={handleSchoolRegistration}
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      S'inscrire pour devenir notre partenaire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Nouvel étudiant ?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Rejoignez votre établissement scolaire et accédez à vos cours et ressources.
                    </p>
                    <Button
                      type="button"
                      onClick={handleStudentRegistration}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-400 dark:hover:border-blue-600"
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      S'inscrire en tant qu'étudiant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                En vous connectant, vous acceptez nos{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  conditions d'utilisation
                </button>{' '}
                et notre{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  politique de confidentialité
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}