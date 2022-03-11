export default class DateFormat {
  static dateToDDMMYYYY (date: Date):string {
    const dd = date.getDate().toString().padStart(2, '0')
    const mm = date.getMonth().toString().padStart(2, '0')
    const yyyy = date.getFullYear().toString()
    return `${dd}/${mm}/${yyyy}`
  }

  static dateWithMouth (date: Date): string {
    const dd = date.getDate().toString().padStart(2, '0')
    const mm = date.getMonth()
    const yyyy = date.getFullYear().toString()
    const mouths = this.getMouths()
    return `${dd} de ${mouths[mm - 1]} de ${yyyy}`
  }

  static mouthYear (date: Date): string {
    const since = new Date(date)
    const mm = since.getMonth()
    const yyyy = since.getFullYear().toString()
    const mouths = this.getMouths()
    return `${mouths[mm]} de ${yyyy}`
  }

  private static getMouths () {
    return [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro']
  }
}
