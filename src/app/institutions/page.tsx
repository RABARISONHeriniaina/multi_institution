"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Users, Star, TrendingUp, Award, School, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Institutions() {
  const [institutions, setInstitutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  
  // Refs for infinite scroll
  const observer = useRef()
  const lastInstitutionElementRef = useCallback(node => {
    if (loadingMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loadingMore, hasMore])

  const fetchInstitutions = async (pageNumber = 1, append = false) => {
    try {
      if (pageNumber === 1) {
        setLoading(true)
        setError(null)
      } else {
        setLoadingMore(true)
      }
      
      // Use API Platform standard pagination parameters
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/institutions?page=${pageNumber}&itemsPerPage=9`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch institutions: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Direct array response - data is the institutions array
      const newInstitutions = Array.isArray(data) ? data : []
      
      if (append) {
        setInstitutions(prev => [...prev, ...newInstitutions])
      } else {
        setInstitutions(newInstitutions)
        // For first load, update total count
        setTotalCount(prev => prev + newInstitutions.length)
      }
      
      // Check if there are more pages based on returned data
      // If we got fewer items than requested, we've reached the end
      setHasMore(newInstitutions.length === 9)
      
    } catch (err) {
      console.error('Error fetching institutions:', err)
      setError(err.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchInstitutions(1, false)
  }, [])

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchInstitutions(page, true)
    }
  }, [page])

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return "Adresse non disponible"
    
    const parts = []
    if (address.address) parts.push(address.address)
    if (address.city) parts.push(address.city)
    if (address.country) parts.push(address.country)
    
    return parts.join(", ") || "Adresse non disponible"
  }

  // Generate random rating for display (since it's not in API)
  const getRandomRating = () => {
    return (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
  }

  // Generate random student count for display (since it's not in API)
  const getRandomStudentCount = () => {
    return Math.floor(Math.random() * (1500 - 400) + 400)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Chargement des établissements...</h3>
          <p className="text-muted-foreground">Veuillez patienter pendant que nous récupérons les données.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Erreur de chargement</h3>
          <p className="text-muted-foreground mb-4">
            Impossible de charger les établissements. Veuillez réessayer plus tard.
          </p>
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <Button 
            onClick={() => {
              setPage(1)
              setHasMore(true)
              fetchInstitutions(1, false)
            }} 
            variant="outline"
            className="w-full"
          >
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Section héro professionnelle */}
      <section className="pt-16 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-primary">Choisissez votre établissement</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Sélectionnez parmi notre réseau d&apos;écoles partenaires pour commencer votre processus d&apos;inscription. 
            Chaque école offre des programmes uniques et des opportunités pour la réussite des étudiants.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-card rounded-lg px-4 py-2 shadow-sm border border-border">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">
                {totalCount ? `${totalCount.toLocaleString()}+` : `${institutions.length}+`} Écoles partenaires
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-card rounded-lg px-4 py-2 shadow-sm border border-border">
              <GraduationCap className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-foreground">10 000+ Étudiants</span>
            </div>
            <div className="flex items-center space-x-2 bg-card rounded-lg px-4 py-2 shadow-sm border border-border">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-foreground">Excellence en éducation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des écoles professionnelle */}
      <section className="pt-10 pb-12 px-4">
        <div className="container mx-auto">
          {institutions.length === 0 ? (
            <div className="text-center py-12">
              <School className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Aucun établissement disponible</h3>
              <p className="text-muted-foreground">
                Il n&apos;y a actuellement aucun établissement disponible pour l&apos;inscription.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {institutions.map((institution, index) => (
                  <Card
                    key={`${institution.id}-${index}`}
                    ref={index === institutions.length - 1 ? lastInstitutionElementRef : null}
                    className="group py-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border shadow-sm bg-card"
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={institution.logo || "/placeholder.svg"}
                          alt={institution.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop&crop=entropy&auto=format"
                          }}
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <div className="flex items-center space-x-1 bg-background/90 rounded-full px-2 py-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-medium text-foreground">{getRandomRating()}</span>
                          </div>
                        </div>
                        {institution.brandColor && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-1"
                            style={{ backgroundColor: institution.brandColor }}
                          />
                        )}
                      </div>
                      <div className="pt-2 pl-3">
                        <CardTitle className="text-xl mb-2 text-foreground">{institution.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {formatAddress(institution.address)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {institution.description || "Une institution d'excellence dédiée à la formation de qualité."}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-primary" />
                          <span className="font-semibold text-foreground">{getRandomStudentCount().toLocaleString()}</span>
                          <span className="text-muted-foreground ml-1">étudiants</span>
                        </div>
                        {institution.website && (
                          <a 
                            href={institution.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Site web
                          </a>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-4">
                        <span>Créé le {new Date(institution.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <Link href={`/institutions/${institution.id}/register`} className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-primary/90 transition-colors">
                          S&apos;inscrire à {institution.name}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Loading indicator for infinite scroll */}
              {loadingMore && (
                <div className="flex justify-center mt-8">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chargement d&apos;autres établissements...</p>
                  </div>
                </div>
              )}
              
              {/* End of results indicator */}
              {!hasMore && institutions.length > 0 && (
                <div className="text-center mt-8 py-4">
                  <p className="text-sm text-muted-foreground">
                    Vous avez vu tous les établissements disponibles ({institutions.length} au total)
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section des fonctionnalités professionnelle */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Pourquoi choisir notre plateforme ?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous rendons l&apos;inscription scolaire simple, sécurisée et efficace pour les étudiants et les familles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border shadow-sm bg-card hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">Inscription facile</h4>
                <p className="text-muted-foreground">Processus d&apos;inscription simplifié avec un guide étape par étape</p>
              </CardContent>
            </Card>
            <Card className="text-center border-border shadow-sm bg-card hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">Réseau de confiance</h4>
                <p className="text-muted-foreground">Partenariat avec des écoles de premier plan à travers le pays</p>
              </CardContent>
            </Card>
            <Card className="text-center border-border shadow-sm bg-card hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">Support local</h4>
                <p className="text-muted-foreground">Trouvez des écoles dans votre région avec des recommandations personnalisées</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}