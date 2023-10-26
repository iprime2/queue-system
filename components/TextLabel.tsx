"use client"

import { FC } from 'react'

interface TextLabelProps{
    text: string
}

const TextLabel: FC<TextLabelProps> = ({text}) => {
  return (
    <div className="w-full flex hover:bg-slate-400/50 hover:rounded-md cursor-pointer p-1 px-3">
      <p className='font-medium text-sm text-slate-500'>{text}</p>
    </div>
  )
}

export default TextLabel
