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

export default function Cities() {
  const client = createClient()

  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, count, error } = await client.from('cities').select('*')
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
        <Link href='/cidades/cadastrar'>
          <Button variant='outline' className='gap-1.5'>
            <Plus className='size-5' /> Adicionar cidade
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
            <TableCaption>Lista das cidades cadastradas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>CEP</TableHead>
                <TableHead className='text-right'>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map(({ id, name, state, zip_code }) => (
                <TableRow key={id}>
                  <TableCell className='font-medium'>{name}</TableCell>
                  <TableCell>{state}</TableCell>
                  <TableCell>{zip_code}</TableCell>
                  <TableCell className='flex justify-end'>
                    <Link href={`/cidades/atualizar?id=${id}`}>
                      <SquarePen className='size-5' />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
