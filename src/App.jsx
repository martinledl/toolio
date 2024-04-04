import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "@/components/ui/button.jsx";
import {compress, compressAccurately, downloadFile} from 'image-conversion';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

function App() {
  const [count, setCount] = useState(0)

  const convert = async () => {
    const file = document.getElementById('infile')?.files[0];
    const scale = document.getElementById('scale')?.value ?? 1.0;
    const size = document.getElementById('size')?.value ?? 5000;

    if (!file) {
      return;
    }

    const res = await compressAccurately(file, {
      size: size,
      accuracy: 0.95,
      scale: scale,
    });
    downloadFile(res, 'compressed.jpg');
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="infile" className="text-left">Input file</Label>
      <Input id="infile" type="file"/>

      <Label htmlFor="scale" className="text-left">Scale</Label>
      <Input id="scale" type="number" defaultValue={1.0} min={0.1} max={1.0} step={0.1} />

      <Label htmlFor="size" className="text-left">Size (in KB)</Label>
      <Input id="size" type="number" defaultValue={5000} min={0} step={1000} />

      <Button onClick={convert}>Convert</Button>
    </div>
  )
}

export default App
