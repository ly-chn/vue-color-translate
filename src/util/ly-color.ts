export class LyColor {
  // red
  private readonly r: number
  // green
  private readonly g: number
  // blue
  private readonly b: number
  // alpha
  private readonly a: number

  constructor(color: string) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.style.color = color
    const computedColor = window.getComputedStyle(div).color
    document.body.removeChild(div)
    console.log(computedColor)
    const [r = 0, g = 0, b = 0, a = 1] = computedColor.match(/\d+(\.\d+)?/g) ?? []
    this.r = +r
    this.g = +g
    this.b = +b
    this.a = +a
  }

  toHex() {
    return `#${LyColor.#hex(this.r)}${LyColor.#hex(this.g)}${LyColor.#hex(this.b)}`
  }

  toHexA() {
    return `#${LyColor.#hex(this.r)}${LyColor.#hex(this.g)}${LyColor.#hex(this.b)}${LyColor.#hex(Math.round(this.a * 255))}`
  }

  toRGB() {
    return `rgb(${this.r} ${this.g} ${this.b})`
  }

  toRGBA() {
    return `rgba(${this.r} ${this.g} ${this.b} / ${this.a})`
  }

  toHSL() {
    const [h, s, l] = this.getHSLA()
    return `hsl(${h} ${s}% ${l}%)`
  }

  toHSLA() {
    const [h, s, l, a] = this.getHSLA()
    return `hsla(${h} ${s}% ${l}% / ${a})`
  }

  getHSLA(): [h: number, s: number, l: number, a: number] {
    const r = this.r / 255, g = this.g / 255, b = this.b / 255
    let minC = Math.min(r, g, b), maxC = Math.max(r, g, b), delta = maxC - minC
    let h: number, s: number, l: number
    if (delta === 0) {
      h = 0
    } else if (maxC == r) {
      h = ((g - b) / delta) % 6
    } else if (maxC == g) {
      h = (b - r) / delta + 2
    } else {
      h = (r - g) / delta + 4
    }
    h = Math.round(h * 60)

    if (h < 0)
      h += 360

    l = (maxC + minC) / 2

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)
    return [h, s, l, this.a]
  }

  getRGBA(): [r: number, g: number, b: number, a: number] {
    return [this.r, this.g, this.b, this.a]
  }

  static #hex(decimal: number) {
    const hex = decimal.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
}
