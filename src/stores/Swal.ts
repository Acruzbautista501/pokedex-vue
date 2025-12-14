import { defineStore } from 'pinia'
import { computed } from 'vue'
import Swal from 'sweetalert2'
import type { SweetAlertOptions } from 'sweetalert2'
import { useThemeStore } from './theme'

export const useSwalStore = defineStore('swal', () => {
  const themeStore = useThemeStore()

  // ✅ Opciones BASE para todos los SweetAlert
  const baseOptions = computed<Partial<SweetAlertOptions>>(() => ({
    background: themeStore.darkMode ? '#1e1e2d' : '#ffffff',
    color: themeStore.darkMode ? '#f1f1f1' : '#212529',

    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
      htmlContainer: 'swal-text',
      confirmButton: 'swal-confirm',
      cancelButton: 'swal-cancel'
    },

    buttonsStyling: false
  }))

  // ✅ Método base (YA NO ROMPE TYPESCRIPT)
  const fire = (options: Partial<SweetAlertOptions>) => {
    return Swal.fire({
      ...baseOptions.value,
      ...options
    } as SweetAlertOptions)
  }

  // ✅ Métodos rápidos
  const success = (title: string, text?: string) => {
    return fire({
      icon: 'success',
      title,
      text
    })
  }


  const warning = (title: string, text?: string) => {
    return fire({
      icon: 'warning',
      title,
      text
    })
  }

  const error = (title: string, text?: string) => {
    return fire({
      icon: 'error',
      title,
      text
    })
  }

  const confirm = (title: string, text?: string) => {
    return fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
  }

  return {
    fire,
    warning,
    success,
    error,
    confirm
  }
})
