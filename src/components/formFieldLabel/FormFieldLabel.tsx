interface FormFieldLabelProps {
  text: string
  required?: boolean
}

export default function FormFieldLabel({ text, required }: FormFieldLabelProps) {
  return (
    <label className="text-gray-600 pl-2">
      {text} {required && <span className="text-pink-500">*</span>}
    </label>
  )
}
