import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const FormInput = ({
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input {...props} />
    </FormControl>
    <FormMessage />
  </FormItem>
)

export default FormInput
