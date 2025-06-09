'use client'

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Loader2, AlertCircle, Plus, Home, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

// Define columns
const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logoUrl = row.original.logo
      return logoUrl ? (
        <img
          src={logoUrl}
          alt="Logo"
          className="rounded-md w-10 h-10 object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-muted rounded-md" />
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.original.description || ""
      return desc.length > 100 ? desc.slice(0, 100) + "…" : desc
    },
  },
  {
    accessorKey: "address",
    header: "Adresse",
    cell: ({ row }) => {
      const a = row.original.address
      return a ? [a.address, a.city, a.country].filter(Boolean).join(", ") : "Non disponible"
    },
  },
  {
    accessorKey: "website",
    header: "Site Web",
    cell: ({ row }) =>
      row.original.website ? (
        <a
          href={row.original.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {row.original.website.replace(/^https?:\/\//, "").split("/")[0]}
        </a>
      ) : "—",
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("fr-FR"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const institution = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleView(institution)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Voir les détails
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleEdit(institution)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleDelete(institution)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const ITEMS_PER_PAGE = 15

  // Action handlers
  const handleView = (institution: any) => {
    console.log('View institution:', institution)
  }

  const handleEdit = (institution: any) => {
    console.log('Edit institution:', institution)
  }

  const handleDelete = (institution: any) => {
    console.log('Delete institution:', institution)
  }

  const fetchInstitutions = async (pageNum: number, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/institutions?page=${pageNum}&itemsPerPage=${ITEMS_PER_PAGE}`
      )
      const data = await res.json()

      if (isInitial) {
        setInstitutions(data)
      } else {
        setInstitutions(prev => [...prev, ...data])
      }

      // Check if we have more data to load
      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false)
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchInstitutions(1, true)
  }, [])

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== 
      document.documentElement.offsetHeight ||
      loadingMore ||
      !hasMore
    ) {
      return
    }

    const nextPage = page + 1
    setPage(nextPage)
    fetchInstitutions(nextPage)
  }, [page, loadingMore, hasMore])

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Établissements</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Établissements</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? 
              "Chargement..." : 
              `${institutions.length} établissement${institutions.length > 1 ? 's' : ''} affiché${institutions.length > 1 ? 's' : ''}`
            }
          </p>
        </div>
        <Button variant="default" className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un établissement
        </Button>
      </div>

{error ? (
        <div className="flex items-center justify-center py-12 text-center">
          <div>
            <AlertCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          {/* Table header skeleton */}
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-4 bg-gray-200" />
              <Skeleton className="h-4 w-12 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
            </div>
          </div>
          
          {/* Table rows skeleton */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-4 border-b">
              <Skeleton className="h-4 w-4 bg-gray-200" />
              <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-4 w-48 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-8 w-8 bg-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={institutions} />

          {loadingMore && (
            <div className="space-y-4 py-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 py-4 border-b">
                  <Skeleton className="h-4 w-4 bg-gray-200" />
                  <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-4 w-48 bg-gray-200" />
                  <Skeleton className="h-4 w-32 bg-gray-200" />
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-4 w-16 bg-gray-200" />
                  <Skeleton className="h-8 w-8 bg-gray-200" />
                </div>
              ))}
            </div>
          )}

          {!hasMore && institutions.length > 0 && (
            <div className="flex items-center justify-center py-8">
              <span className="text-sm text-muted-foreground">
                Tous les établissements ont été chargés
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}