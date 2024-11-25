'use client'
import { useState, useEffect } from 'react';
import { fetchClients, createClient } from '@/actions/quotations/clientsProductsActions';

export default function ClientSelector({ selectedClientId, onChange }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    channel_id: '',
    sales_funnel_id: 1
  });

  useEffect(() => {
    loadClients();
  }, [searchTerm]);

  const loadClients = async () => {
    try {
      const data = await fetchClients(searchTerm);
      setClients(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los clientes');
      setLoading(false);
    }
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const createdClient = await createClient(newClient);
      setClients(prev => [...prev, createdClient]);
      onChange(createdClient.id);
      setShowNewClientForm(false);
      setNewClient({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        channel_id: '',
        sales_funnel_id: 1
      });
    } catch (err) {
      setError('Error al crear el cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {!showNewClientForm ? (
        <>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <button
              type="button"
              onClick={() => setShowNewClientForm(true)}
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              + Nuevo Cliente
            </button>
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Buscar cliente..."
          />

          <select
            value={selectedClientId}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar cliente</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {`${client.name} ${client.last_name} - ${client.company || 'Sin empresa'}`}
              </option>
            ))}
          </select>
        </>
      ) : (
        <form onSubmit={handleCreateClient} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Nuevo Cliente</h3>
            <button
              type="button"
              onClick={() => setShowNewClientForm(false)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                required
                value={newClient.name}
                onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                required
                value={newClient.last_name}
                onChange={(e) => setNewClient(prev => ({ ...prev, last_name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                value={newClient.phone}
                onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Empresa
              </label>
              <input
                type="text"
                value={newClient.company}
                onChange={(e) => setNewClient(prev => ({ ...prev, company: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Canal
              </label>
              <input
                type="text"
                value={newClient.channel_id}
                onChange={(e) => setNewClient(prev => ({ ...prev, channel_id: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            >
              {loading ? 'Guardando...' : 'Guardar Cliente'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}