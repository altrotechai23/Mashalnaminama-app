import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteCollection } from "@/lib/actions/collection";

export default async function CollectionsPage() {
  // 1. Fetch data on the server
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Collections</h1>
        <Link 
          href="/admin/collections/new" 
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition"
        >
          <Plus size={18} /> Add Collection
        </Link>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-sm text-gray-600">Collection Name</th>
              <th className="px-6 py-3 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {collections.map((col) => (
              <tr key={col.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{col.name}</span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  {/* EDIT LINK: Navigates to the dynamic edit route */}
                  <Link 
                    href={`/admin/collections/edit/${col.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                    title="Edit Collection"
                  >
                    <Edit size={18} />
                  </Link>
                  
                  {/* DELETE BUTTON: Wrapped in a form to trigger a Server Action */}
                  <form action={async () => {
                    "use server"
                    await deleteCollection(col.id)
                  }}>
                    <button 
                      type="submit"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                      title="Delete Collection"
                    >
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            
            {collections.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-10 text-center text-gray-500">
                  No collections found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
