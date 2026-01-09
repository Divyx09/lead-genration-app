import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash, FaEnvelope, FaDownload } from 'react-icons/fa';

const SubscribersManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/subscribers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(data.data);
    } catch (error) {
      toast.error('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/subscribers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Subscriber deleted successfully');
      fetchSubscribers();
    } catch (error) {
      toast.error('Failed to delete subscriber');
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Subscribed Date'],
      ...subscribers.map(sub => [sub.email, new Date(sub.createdAt).toLocaleDateString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    toast.success('Exported to CSV');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Subscribed Email Addresses</h1>
          <p className="text-gray-600 mt-2">Total Subscribers: {subscribers.length}</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Email Address</th>
              <th className="px-6 py-4 text-left">Subscribed Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscribers.map((subscriber) => (
              <tr key={subscriber._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-primary" />
                    <span className="font-medium text-gray-900">{subscriber.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(subscriber._id)}
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
        {subscribers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No subscribers yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribersManagement;
