'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Plus, SquarePen } from 'lucide-react'

import { createClient } from '@/utils/supabase/client'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

export default function Companies() {
  const client = createClient()

  const {
    data: companies,
    error,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, count, error } = await client.from('companies').select(`
        id,
        name,
        whatsapp,
        instagram,
        is_active,
        cities ( name, state )
      `)

      return { data, count, error }
    },
  })

  return (
    <div className='flex flex-col flex-1'>
      <div className='flex w-full justify-between items-center'>
        <div>
          {isRefetching && (
            <div className='flex gap-2 items-center'>
              <Spinner className='w-4 h-4' />
              <span className='text-sm text-gray-400'>
                Atualizando a lista...
              </span>
            </div>
          )}
        </div>
        <Link href='/empresas/cadastrar'>
          <Button variant='outline' className='gap-1.5'>
            <Plus className='size-5' /> Adicionar empresa
          </Button>
        </Link>
      </div>
      <div>
        {isLoading ? (
          <div className='flex flex-1 justify-center items-center'>
            <Spinner />
          </div>
        ) : (
          <Table>
            <TableCaption>Lista das empresas cadastradas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies &&
                companies?.data?.map(
                  ({ id, name, whatsapp, instagram, is_active, cities }) => (
                    <TableRow key={id}>
                      <TableCell className='font-medium capitalize'>
                        {name}
                      </TableCell>
                      <TableCell className='font-medium'>{whatsapp}</TableCell>
                      <TableCell className='font-medium'>{instagram}</TableCell>
                      <TableCell className='font-medium'>
                        {/* @ts-ignore */}
                        {cities.name} - {cities.state}
                      </TableCell>
                      <TableCell className='font-medium'>
                        {is_active ? 'Ativo' : 'Inativo'}
                      </TableCell>
                      <TableCell className='flex justify-end'>
                        <Link href={`/empresas/atualizar?id=${id}`}>
                          <SquarePen className='size-5' />
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
