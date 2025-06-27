import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PlaceForm from '../PlaceForm.vue'

describe('PlaceForm', () => {
  it('does not emit add event if name is missing', async () => {
    const wrapper = mount(PlaceForm)

    // Test: Wenn der Name leer ist
    const input = wrapper.find('input[placeholder="Name"]')
    await input.setValue('')  // Leerer Name

    const select = wrapper.find('select')
    await select.setValue('5')  // Gültige Bewertung

    await wrapper.find('button').trigger('click')
    await flushPromises()

    const addEvent = wrapper.emitted('add')
    expect(addEvent).toBeUndefined()  // Explizit auf undefined prüfen
  })

  it('does not emit add event if rating is not selected', async () => {
    const wrapper = mount(PlaceForm)

    // Test: Wenn keine Bewertung ausgewählt ist
    const input = wrapper.find('input[placeholder="Name"]')
    await input.setValue('Beach')  // Gültiger Name

    const select = wrapper.find('select')
    // Keine Bewertung setzen oder auf den default Wert setzen
    await select.setValue('')  // Oder was auch immer der default "nicht ausgewählt" Wert ist

    await wrapper.find('button').trigger('click')
    await flushPromises()

    const addEvent = wrapper.emitted('add')
    expect(addEvent).toBeUndefined()  // Explizit auf undefined prüfen
  })

  it('does not emit add event if both name and rating are missing', async () => {
    const wrapper = mount(PlaceForm)

    // Beide Felder leer lassen
    const input = wrapper.find('input[placeholder="Name"]')
    await input.setValue('')

    const select = wrapper.find('select')
    await select.setValue('')

    await wrapper.find('button').trigger('click')
    await flushPromises()

    const addEvent = wrapper.emitted('add')
    expect(addEvent).toBeUndefined()  // Explizit auf undefined prüfen
  })
})
