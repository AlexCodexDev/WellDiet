import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import { Notification } from "@/components/notification";

interface CategoriesProps {
  code: string;
  name: string;
  description: string;
  isActive: number;
}

export const CategoriesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // START: Declaration category
  const [data, setData] = useState<CategoriesProps[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [lastAdded, setLastAdded] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  // END: Declaration category

 const handleUpdateModal = (
    name: string,
    description: string,
    isActive: number
  ) => {
    const status = isActive === 1 ? "active" : "in_active";
    
    setIsModalOpen(true);
    setName(name);
    setDescription(description);
    setActiveStatus(status);
 }

  // START: Fetch Data
  const fetchCategory = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/fetch`,
        {
          credentials: "include"
        }
      );
  
      const result = await response.json();

      if(!response.ok) {
        Notification(
          "Failed to fetch category.",
          "error",
          false
        );

        return;
      }

      setLastAdded(new Date(result[0].created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      }));
      setCounter(result.length);
      setData(
        result.map(({ is_active, ...item }: any) => ({
          ...item,
          isActive: is_active
        }))
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Fetch Data

  // START: Create
  const handleAddCategory = async () => {
    setIsLoading(true);

    if(!name) {
      Notification(
        "Category name cannot be empty.",
        "warning",
        false
      );

      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            description
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchCategory();
  
      onClear();
      setIsModalOpen(false);
  
      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Create

  // START: Update
  const handleUpdateCategory = async () => {
    setIsLoading(true);

    if(!name) {
      Notification(
        "Category name cannot be empty.",
        "warning",
        false
      );

      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/update/${selectedCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            description,
            activeStatus
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result.message,
          "error",
          false
        );

        return;
      }

      await fetchCategory();

      onClear();
      setIsModalOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Update

  // START: Delete
  const handleDeleteCategory = async (code: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/delete/${code}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );
  
      const result = await response.json();
  
      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }
  
      await fetchCategory();

      setSelectedCode(null);
      setIsDeleteModalOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Delete

  // START: Function cancel
  function onClear() {
    setName("");
    setDescription("");
    setActiveStatus(null);
    setSelectedCode(null);
  }
  // END: Function cancel

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <AdminLayout>
      <div className="mx-auto max-w-330 space-y-6">
        {/* Top Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Category Management 
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[36px]">
              Categories
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              Organize and manage dietary categories to keep nutritional guidance structured, consistent, and easy to understand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
            >
              <span>+</span>
              <span>Add category</span>
            </button>
          </div>
        </div>

        {/* Middle Table Card: Your Rules */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
          {/* Card Header */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Your categories</h2>
              <p className="mt-0.5 text-xs text-[#7D8A83]">
                {counter === 1 ? `${counter} category` : `${counter} categories`} · Last added {lastAdded}
              </p>
            </div>
          </div>

          {/* Rules Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-stone-200/80 text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                  <th className="py-3 pr-4 pl-2">Category Code</th>
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Description</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {isLoading === true ? (
                  <tr>
                      <td colSpan={5} className="py-8 text-center">
                          Loading categories...
                      </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                          No Categories found.
                      </td>
                  </tr>
                ) : (
                  data.map((item: any) => (
                    <tr
                      key={item.code}
                      className={`cursor-pointer transition-colors hover:bg-[#FAF9F6]`}
                    >
                      <td className="py-3.5 pr-4 pl-2 font-semibold whitespace-nowrap text-[#3A5446]">
                        {item.code}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{item.name}</td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-[#5A6560]">
                        {item.description || "-"}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap">
                        {item.isActive === 1 ?
                          <p className="bg-[#2C4C3B] py-2 px-2 text-white rounded-2xl w-20 text-center">Active</p> :
                          <p className="bg-[#E7ECE2] py-2 px-2 text-bg-[#2C4C3B] rounded-2xl w-20 text-center">In Active</p>
                        }
                      </td>
                      <td className="py-3.5 flex gap-2 justify-end text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCode(item.code);
                            handleUpdateModal(
                              item.name,
                              item.description,
                              item.isActive
                            );
                          }}
                          className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                        >
                          <span>Edit</span>
                          <span aria-hidden="true">→</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCode(item.code);
                            setIsDeleteModalOpen(true);
                          }}
                          className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                        >
                          <span>Delete</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-[11px] text-[#7D8A83]">
            {/* <span>Showing 1–{filteredRules.length} of 24 rules</span> */}
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &lt;
              </button>
              <button
                type="button"
                className="rounded-md bg-[#E6EDE4] px-2.5 py-1 font-semibold text-[#2C4C3B]"
              >
                1
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                2
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                3
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                4
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                5
              </button>
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Rule Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Add new category</h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  onClear();
                }}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                
                selectedCode !== null ?
                  handleUpdateCategory() :
                  handleAddCategory()
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Name <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., weight loss"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                /> 
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category description"
                  className="w-full h-30 rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              {selectedCode !== null && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                    Active Status <span className="text-[#182B20]">*</span>
                  </label>
                  <select
                    value={activeStatus ?? ""}
                    onChange={(e) => setActiveStatus(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="in_active">In Active</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onClear();
                  }}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D] cursor-pointer"
                >
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Delete Confirmation</h3>
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  onClear();
                }}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col justify-center items-center py-4">
              <h3 className="text-2xl font-bold">Are You Sure?</h3>
              <p>Deleted category cannot be retieve.</p>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    onClear();
                  }}
                  className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-[#5A6560] hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-sm font-medium text-white hover:bg-[#213A2D] cursor-pointer"
                  onClick={() => {
                    if(selectedCode !== null) {
                      handleDeleteCategory(selectedCode);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CategoriesPage;