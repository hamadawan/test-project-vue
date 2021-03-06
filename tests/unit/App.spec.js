import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App.vue', () => {
  it('Check Name validation', () => {
    const wrapper = mount(App)
    const input = wrapper.find('#name')
    const button = wrapper.find('#create')
    input.setValue('ha')
    button.trigger('click')
    expect(wrapper.vm.errors.name).toBe('Minimum 3 characters required!')
  })

  it('Check Reference validation', () => {
    const wrapper = mount(App)
    const input = wrapper.find('#reference')
    const button = wrapper.find('#create')
    input.setValue('')
    button.trigger('click')
    expect(wrapper.vm.errors.reference).toBe('Minimum 3 characters required!')
  })

  it('Check Price validation', () => {
    const wrapper = mount(App)
    const input2 = wrapper.find('#price')
    const button = wrapper.find('#create')
    input2.setValue(-1)
    button.trigger('click')
    expect(wrapper.vm.errors.price).toBe('Minimum price should be greater than zero!')
  })

  it('Renders correctly', () => {
    const wrapper = mount(App)
    expect(wrapper.element).toMatchSnapshot()
  })
})