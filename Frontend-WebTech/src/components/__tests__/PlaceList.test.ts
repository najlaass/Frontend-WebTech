import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlaceList from '../PlaceList.vue'
import type { Place } from '../types/place.ts'

describe('PlaceList', () => {
  const mockPlaces: Place[] = [
    {
      id: 1,
      name: 'Beach',
      activity: 'Swimming',
      rating: 5,
      visited: false,
      description: '' // Füge hier die 'description' hinzu
    }
  ]


  it('renders all places', () => {
    const wrapper = mount(PlaceList, {
      props: { places: mockPlaces }
    })
    const nameInput = wrapper.find(
      '[data-place-id="1"] input[placeholder="Enter name"]'
    )
    const activityInput = wrapper.find(
      '[data-place-id="1"] input[placeholder="Enter activity"]'
    )
    expect((nameInput.element as HTMLInputElement).value).toBe('Beach')
    expect((activityInput.element as HTMLInputElement).value).toBe('Swimming')
  })

  it('emits update event when name is changed', async () => {
    const wrapper = mount(PlaceList, {
      props: { places: mockPlaces }
    })
    const input = wrapper.find(
      '[data-place-id="1"] input[placeholder="Enter name"]'
    )
    await input.setValue('New Beach')

    const updateEvent = wrapper.emitted('update')
    expect(updateEvent).toBeTruthy()
    expect(updateEvent![0][0]).toEqual({
      ...mockPlaces[0],
      name: 'New Beach'
    })
  })

  it('emits update event when visited is toggled', async () => {
    const wrapper = mount(PlaceList, {
      props: { places: mockPlaces }
    })

    const checkbox = wrapper.find(
      '[data-place-id="1"] input[type="checkbox"]'
    )
    await checkbox.setValue(true)

    const updateEvent = wrapper.emitted('update')
    expect(updateEvent).toBeTruthy()
    expect(updateEvent![0][0]).toEqual({
      ...mockPlaces[0],
      visited: true
    })
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(PlaceList, {
      props: { places: mockPlaces }
    })

    await wrapper.find('button').trigger('click')

    const deleteEvent = wrapper.emitted('delete')
    expect(deleteEvent).toBeTruthy()
    expect(deleteEvent![0][0]).toBe(1)
  })
})

