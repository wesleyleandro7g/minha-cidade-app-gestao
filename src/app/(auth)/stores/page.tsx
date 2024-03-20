'use client'

import { Settings } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { StoreRegisterForm } from '@/components/forms/store-register-form'
import Link from 'next/link'

import type { storeType } from '@/types/store'

type responseType = storeType & {
  cityName: string
}

export default function Stores() {
  const { data, error, isLoading, isRefetching } = useQuery<responseType[]>({
    queryKey: ['stores'],
    queryFn: () => fetch('/api/store').then((response) => response.json()),
  })

  if (error) {
    return (
      <div>
        <h6>Erro ao carregar dados</h6>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex w-full pb-4'>
        <h1 className='text-2xl font-semibold text-gray-950'>Lojas</h1>
      </div>

      <div className='flex flex-1 flex-col'>
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

          <div>
            <Dialog>
              <StoreRegisterForm />
              <DialogTrigger asChild>
                <Button className='text-white'>Adicionar nova</Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className='flex flex-1 justify-center items-center'>
              <Spinner />
            </div>
          ) : (
            <Table>
              <TableCaption>Lista das lojas cadastradas.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Instagram</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead className='text-right'>Editar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.email}</TableCell>
                    <TableCell>{store.phone}</TableCell>
                    <TableCell>{store.whatsapp}</TableCell>
                    <TableCell>{store.instagram}</TableCell>
                    <TableCell>{store.website}</TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>{store.cityName}</TableCell>
                    <TableCell className='flex justify-end'>
                      <Link href={`/stores/${store.id}`}>
                        <Settings className='size-5' />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
