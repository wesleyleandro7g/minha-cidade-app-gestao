'use client'

import { SquarePen } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { CategoryRegisterForm } from '@/components/forms/category-register-form'
import { CategoryUpdateForm } from '@/components/forms/category-update-form'
import { Icon, type ExtractedIconNames } from '@/components/others/icon'

type categoryType = {
  id: string
  name: string
  iconName: ExtractedIconNames
  createdAt?: string
}

export default function Category() {
  const { data, error, isLoading, isRefetching } = useQuery<categoryType[]>({
    queryKey: ['categories'],
    queryFn: () => fetch('/api/category').then((response) => response.json()),
  })

  if (error) {
    return (
      <div>
        <h6>Erro ao carregar dados</h6>
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-1 flex-col'>
        <div className='flex justify-end'>
          <Dialog>
            <CategoryRegisterForm />
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

              <DialogTrigger asChild>
                <Button className='text-white'>Adicionar nova</Button>
              </DialogTrigger>
            </div>
          </Dialog>
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Qtd. de Lojas</TableHead>
                  <TableHead>Icone</TableHead>
                  <TableHead className='text-right'>Editar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map(({ iconName, id, name }) => (
                  <TableRow key={id}>
                    <TableCell className='font-medium'>{name}</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      <Icon name={iconName} className='size-5' />
                    </TableCell>
                    <TableCell className='flex justify-end'>
                      <Dialog>
                        <CategoryUpdateForm
                          id={id}
                          name={name}
                          iconName={iconName}
                        />
                        <DialogTrigger asChild>
                          <button>
                            <SquarePen className='size-5' />
                          </button>
                        </DialogTrigger>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  )
}
