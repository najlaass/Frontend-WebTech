import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlaceForm from '../PlaceForm.vue'

describe('PlaceForm', () => {
  it('emits add event when button is clicked', async () => {
    const wrapper = mount(PlaceForm)

    await wrapper.find('button').trigger('click')

    const addEvent = wrapper.emitted('add')
    expect(addEvent).toBeTruthy()
    expect(addEvent).toHaveLength(1)
  })

  it('renders add button with correct text', () => {
    const wrapper = mount(PlaceForm)
    expect(wrapper.find('button').text()).toBe('Add New Place')
  })
})
