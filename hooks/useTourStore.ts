import { create } from 'zustand'
import { Brewery } from '@/types'

interface TourStore {
  selectedBreweries: Brewery[]
  maxBreweries: number
  addBrewery: (brewery: Brewery) => boolean
  removeBrewery: (placeId: string) => void
  clearTour: () => void
  isBrewerySelected: (placeId: string) => boolean
  canAddMore: () => boolean
}

export const useTourStore = create<TourStore>((set, get) => ({
  selectedBreweries: [],
  maxBreweries: 5,

  addBrewery: (brewery: Brewery) => {
    const { selectedBreweries, maxBreweries } = get()

    if (selectedBreweries.length >= maxBreweries) {
      return false
    }

    if (selectedBreweries.some((b) => b.place_id === brewery.place_id)) {
      return false
    }

    set({ selectedBreweries: [...selectedBreweries, brewery] })
    return true
  },

  removeBrewery: (placeId: string) => {
    set((state) => ({
      selectedBreweries: state.selectedBreweries.filter(
        (b) => b.place_id !== placeId
      ),
    }))
  },

  clearTour: () => {
    set({ selectedBreweries: [] })
  },

  isBrewerySelected: (placeId: string) => {
    return get().selectedBreweries.some((b) => b.place_id === placeId)
  },

  canAddMore: () => {
    return get().selectedBreweries.length < get().maxBreweries
  },
}))
