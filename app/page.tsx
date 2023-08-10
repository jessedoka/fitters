'use client'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { MDXProvider } from '@mdx-js/react'

export default function Home() {

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('')
  const [isMale, setIsMale] = useState(true)

  // check if in developement 

  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://fitters.netlify.app/'

  const fetchData = async () => {
    // POST /api/generate-answer
    setLoading(true)
    try {

      if (!prompt || prompt === null) return
      const res = await fetch(`${url}/api/generate-answer`, {
        method: 'POST',
        body: JSON.stringify({ prompt, style, isMale }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      setData(json)

      if (!data) return
      console.log(data)
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-16">
      <Navbar PageTitle="Fitters" />
      {/* search bar */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium text-center">Find the perfect fit</h2>

        <span className='text-white opacity-40 max-w-lg text-center mt-3'>
          The more specific you are, the better the results.
        </span>

        {/* toggle between male and femail buttons */}

        <div className="flex flex-row items-center justify-center w-full mt-8 space-x-7">
          <button className={`w-1/2 px-4 py-2 text-lg font-medium dark:text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 border focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ${isMale ? 'text-white bg-sky-500' : 'transparent'}`}
          onClick={() => setIsMale(true)}
          >
            Male 
          </button>

          <button className={`w-1/2 px-4 py-2 text-lg font-medium dark:text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 border focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ${isMale ? 'transparent' : 'text-white bg-sky-500'}`}
          onClick={() => setIsMale(false)}
          >
            Female
          </button>
        </div>

        {/* search bar */}

        <div className="flex flex-col items-center justify-center w-full mt-8">

          <input
            type="text"
            className="w-full px-4 py-2 text-lg border rounded-md bg-transparent
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
            placeholder="Describe The Style You Want!"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
      </div>
    

        <div className="flex flex-col items-center justify-center w-full mt-8">
          
          <input
            type="text"
            className="w-full px-4 py-2 text-lg border rounded-md bg-transparent
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
            placeholder="Describe Your Outfit!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="w-full px-4 py-2 mt-4 text-lg font-medium text-white bg-sky-500 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300"
          onClick={fetchData}
          >
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </div>
      </div>

      {data && (
        <div className="flex flex-col items-center justify-center w-full mt-8">
          <h2 className="text-2xl font-medium text-center">Answer</h2>
          <div className="flex flex-col items-center justify-center w-full mt-8">
            <p className="text-lg font-medium max-w-2xl">
                {
                  typeof data.text === 'string' ? 
                  data.text.split('\n').map(
                    (str: string, i: number) => <p key={i}>{str}</p>
                  ) 
                  : data.text
                }
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
