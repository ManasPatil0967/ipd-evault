export default function Request({onClose}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form className="w-full max-w-lg p-6 mt-6 bg-white text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Request Certificate 
        </h2>
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
              type="submit" onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" onClick={handleSubmit}
            >
             Close 
            </button>
          </div>
        </form>
      </div>
    )
}
