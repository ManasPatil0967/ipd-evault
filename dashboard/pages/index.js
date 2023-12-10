/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jbrmrkXHLX7
 */
export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-[#22c55e]">
      <nav className="bg-black flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img alt="Vercel logo" className="w-8 h-8 mr-3 bg-white" src="/vercel.svg" />
          <h1 className="text-2xl font-bold text-white">DocVault</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a className="text-xl text-white" href="/signup">
            Signup
          </a>
          <a className="text-xl text-white" href="/login">
            Login
          </a>
        </div>
      </nav>
      <div className="border-t border-white" />
      <div className="flex-grow flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-5xl font-bold">Welcome to DocVault</h2>
        <p className="text-xl mt-6 px-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non est id velit porttitor malesuada. Cras
          lacinia risus at dui pellentesque, sed finibus lorem condimentum.
        </p>
      </div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <form className="w-full max-w-lg p-6 mt-6 bg-white text-black">
          <h2 className="text-2xl font-bold mb-6 text-center">Request Certificate</h2>
          <div className="flex flex-wrap mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certificate-name">
              Certificate Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="certificate-name"
              placeholder="Certificate Name"
              required
              type="text"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


