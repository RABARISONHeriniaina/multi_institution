'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { 
  getInstitutionData
} from "@/lib/cookies"

export default function InstitutionsPage() {

  const institutionData = getInstitutionData()

  return (
    <div className="min-h-screen p-6 space-y-6 bg-background">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Tableau de bord</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">...</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bonjour,</h1>
          <p>vous êtes inscrit sur : {institutionData.name}</p>
        </div>
      </div>
    </div>
  )
}