import { create } from "zustand"

interface useUserModalProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }

export const useUserModal = create<useUserModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))