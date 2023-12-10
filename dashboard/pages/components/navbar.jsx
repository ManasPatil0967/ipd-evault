export default function Navbar() {
    return (
      <nav className="bg-black flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img alt="Vercel logo" className="w-8 h-8 mr-3 bg-white" src="/vercel.svg" />
          <h1 className="text-2xl font-bold text-white">DocVault</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a className="text-xl text-white" href="/user">
            User
          </a>
          <a className="text-xl text-white" href="/upload">
            Upload
          </a>
          <a className="text-xl text-white" href="/orgs">
            Organizations
          </a>
        </div>
      </nav>
    )
}
