import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(data.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Contact deleted successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === filter);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contact Form Details</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Contacts</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Full Name</th>
              <th className="px-6 py-4 text-left">Email Address</th>
              <th className="px-6 py-4 text-left">Mobile Number</th>
              <th className="px-6 py-4 text-left">City</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-primary" />
                    {contact.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-primary" />
                    {contact.phone || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-primary" />
                    {contact.city || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
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
        {filteredContacts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No contact submissions found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManagement;
