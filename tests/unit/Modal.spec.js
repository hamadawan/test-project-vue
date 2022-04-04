import { shallowMount, mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('ProductForm.vue', () => {
  it('Renders props.content when passed', () => {
    const msg = 'Product created successfully!'
    const wrapper = shallowMount(Modal, {
      propsData: { content: msg, show: true }
    })
    expect(wrapper.text()).toMatch(msg)
  })

  it('Renders correctly', () => {
    const wrapper = mount(Modal)
    expect(wrapper.element).toMatchSnapshot()
  })
})