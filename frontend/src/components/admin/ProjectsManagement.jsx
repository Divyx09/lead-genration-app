import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ImageCropUpload from './ImageCropUpload';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    category: ''
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(data.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageCropped = async (croppedFile) => {
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('image', croppedFile);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/project`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setFormData({ ...formData, image: data.imageUrl });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (editingProject) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/projects/${editingProject._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Project updated successfully');
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/projects`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Project created successfully');
      }
      setShowModal(false);
      setFormData({ name: '', description: '', image: '', category: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      image: project.image,
      category: project.category
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', image: '', category: '' });
    setEditingProject(null);
    setShowModal(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img 
                    src={getImageUrl(project.image)} 
                    alt={project.name} 
                    className="h-16 w-16 object-cover rounded" 
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 text-gray-600">{project.category}</td>
                <td className="px-6 py-4 text-gray-600">{project.description.substring(0, 50)}...</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <ImageCropUpload
                  onImageCropped={handleImageCropped}
                  currentImage={formData.image}
                  label="Project Image"
                />
                {uploading && (
                  <p className="text-sm text-primary mt-2">Uploading image...</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Image Preview after upload */}
           
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition font-medium"
                >
                  {editingProject ? 'Update' : 'Create'} Project
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;
