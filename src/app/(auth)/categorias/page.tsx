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
import { Icon } from '@/components/others/icon'

export default function Categories() {
  const client = createClient()

  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, count, error } = await client.from('categories').select('*')
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
        <Link href='/categorias/cadastrar'>
          <Button variant='outline' className='gap-1.5'>
            <Plus className='size-5' /> Adicionar categoria
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
            <TableCaption>Lista das categorias cadastradas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Icone</TableHead>
                <TableHead className='text-right'>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map(({ id, name, icon_name }) => (
                <TableRow key={id}>
                  <TableCell className='font-medium capitalize'>
                    {name}
                  </TableCell>
                  <TableCell>
                    <Icon name={icon_name} className='size-5' />
                  </TableCell>
                  <TableCell className='flex justify-end'>
                    <Link href={`/categorias/atualizar?id=${id}`}>
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
