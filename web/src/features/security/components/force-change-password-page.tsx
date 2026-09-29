/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SignOutDialog } from '@/components/sign-out-dialog'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'

import { ChangePasswordDialog } from './dialogs/change-password-dialog'

export function ForceChangePasswordPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.auth.user)
  const setUser = useAuthStore((state) => state.auth.setUser)
  const [signOutOpen, setSignOutOpen] = useState(false)

  if (!user) {
    return null
  }

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6'>
      <div className='w-full max-w-md space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {t('Change your password')}
        </h1>
        <p className='text-muted-foreground text-sm'>
          {t(
            'For security, you must change your password before continuing to use the console.'
          )}
        </p>
      </div>
      <ChangePasswordDialog
        open
        forced
        username={user.username}
        hasPassword={user.has_password !== false}
        onOpenChange={() => undefined}
        onSuccess={() => {
          setUser({
            ...user,
            has_password: true,
            must_change_password: false,
          })
          void navigate({ to: '/dashboard', replace: true })
        }}
      />
      <Button
        type='button'
        variant='ghost'
        onClick={() => setSignOutOpen(true)}
      >
        {t('Sign out')}
      </Button>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </div>
  )
}
