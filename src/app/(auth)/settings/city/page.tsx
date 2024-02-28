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
import { CityRegisterForm } from '@/components/forms/city-register-form'
import { CityUpdateForm } from '@/components/forms/city-update-form'

type cityType = {
  id: string
  name: string
  state: string
  zipCode: string
  createdAt?: string
}

export default function City() {
  const { data, error, isLoading, isRefetching } = useQuery<cityType[]>({
    queryKey: ['cities'],
    queryFn: () => fetch('/api/city').then((response) => response.json()),
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
            <CityRegisterForm />
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
                {data?.map(({ id, name, state, zipCode }) => (
                  <TableRow key={id}>
                    <TableCell className='font-medium'>{name}</TableCell>
                    <TableCell>{state}</TableCell>
                    <TableCell>{zipCode}</TableCell>
                    <TableCell className='flex justify-end'>
                      <Dialog>
                        <CityUpdateForm
                          id={id}
                          name={name}
                          state={state}
                          zipCode={zipCode}
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
