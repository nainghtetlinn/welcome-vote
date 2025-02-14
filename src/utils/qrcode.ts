export function isValidQRCode(input: string): boolean {
  const regex =
    /^TUTGI - [A-Za-z\s]+\|\s*[1-6](IT|CIVIL|EC|EP|MP|MN)\s*-\s*\d+$/
  return regex.test(input)
}

export function extractDetails(input: string): {
  name: string
  roll_no: string
} {
  const regex =
    /^TUTGI - ([A-Za-z\s]+)\|\s*([1-6](IT|CIVIL|EC|EP|MP|MN)\s*-\s*\d+)$/
  const match = input.match(regex)

  if (match) {
    return {
      name: match[1].trim(),
      roll_no: match[2].trim(),
    }
  }
  return { name: '', roll_no: '' }
}
