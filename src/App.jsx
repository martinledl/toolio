import { useState } from 'react'
import './App.css'
import {Button} from "@/components/ui/button.jsx";
import {compress, compressAccurately, downloadFile, EImageType} from 'image-conversion';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.jsx";

function App() {
  const [errors, setErrors] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('image/jpeg');

  const convert = async () => {
    const files = document.getElementById('infile')?.files;
    const scale = document.getElementById('scale')?.value ?? 1.0;
    const size = document.getElementById('size')?.value ?? 5000;

    const config = {
      size: size,
      scale: scale,
      type: selectedFormat,
      accuracy: 0.95,
    };

    console.log(config)

    if (!files || files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const result = await compressAccurately(file, config);

        downloadFile(result, file.name.replace(/\.[^/.]+$/, "") + '-compressed.jpg');
      } catch (e) {
        setErrors(prevState => [...prevState, e]);
      }
    }
  }

  return (
    <>
      <div className="flex w-full h-full items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="infile" className="text-left">Input files</Label>
          <Input id="infile" type="file" multiple/>

          <Label htmlFor="scale" className="text-left">Scale</Label>
          <Input id="scale" type="number" defaultValue={1.0} min={0.1} max={1.0} step={0.1}/>

          {/*<Label className="text-left">Output format</Label>*/}
          {/*<Select value={selectedFormat} onValueChange={setSelectedFormat}>*/}
          {/*  <SelectTrigger>*/}
          {/*    <SelectValue placeholder="Image format (default JPEG)" />*/}
          {/*  </SelectTrigger>*/}
          {/*  <SelectContent id="format">*/}
          {/*    <SelectGroup>*/}
          {/*      <SelectLabel>Formats</SelectLabel>*/}
          {/*      <SelectItem value="image/jpeg">JPEG</SelectItem>*/}
          {/*      <SelectItem value="image/png">PNG</SelectItem>*/}
          {/*      <SelectItem value="image/gif">GIF</SelectItem>*/}
          {/*    </SelectGroup>*/}
          {/*  </SelectContent>*/}
          {/*</Select>*/}

          <Label htmlFor="size" className="text-left">Size (in KB)</Label>
          <Input id="size" type="number" defaultValue={5000} min={0} step={1000}/>

          <Button onClick={convert}>Convert</Button>

          {errors.length > 0 && (
            <div className="text-red-500">
              {errors.map((error, index) => (
                <div key={index}>{error.message}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 right-10 p-4 bg-gray-50 border-2">
        <small>Note: TIFF format not supported</small>
      </div>
    </>
  )
}

export default App
