import { useState, type FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Plus, Trash2, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loader } from '../components/ui/Loader';
import { fetchCurrentUser, updateProfile } from '../services/authService';
import { setUser } from '../store/slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import type { Address } from '../types';

export function Addresses() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const profile = await fetchCurrentUser();
      dispatch(setUser(profile));
      return profile;
    },
    enabled: !!user,
  });

  const addresses = user?.addresses || [];

  const saveAddresses = async (updatedAddresses: Address[]) => {
    setSaving(true);
    try {
      const updatedUser = await updateProfile({ addresses: updatedAddresses });
      dispatch(setUser(updatedUser));
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      ...formData,
      isDefault: addresses.length === 0,
    };
    await saveAddresses([...addresses, newAddress]);
    setFormData({ street: '', city: '', state: '', zipCode: '', country: 'USA' });
    setShowForm(false);
  };

  const handleDelete = async (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    await saveAddresses(updated);
  };

  const handleSetDefault = async (index: number) => {
    const updated = addresses.map((address, i) => ({
      ...address,
      isDefault: i === index,
    }));
    await saveAddresses(updated);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Addresses</h1>
          <p className="text-gray-600 mt-1">Manage your shipping addresses</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Address
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h2>
          <form onSubmit={handleAddAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Street Address" value={formData.street} onChange={(v) => setFormData({ ...formData, street: v })} required className="md:col-span-2" />
              <Input label="City" value={formData.city} onChange={(v) => setFormData({ ...formData, city: v })} required />
              <Input label="State" value={formData.state} onChange={(v) => setFormData({ ...formData, state: v })} required />
              <Input label="ZIP Code" value={formData.zipCode} onChange={(v) => setFormData({ ...formData, zipCode: v })} required />
              <Input label="Country" value={formData.country} onChange={(v) => setFormData({ ...formData, country: v })} required />
            </div>
            <div className="flex gap-3">
              <Button type="submit" isLoading={saving}>Save Address</Button>
              <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {addresses.length === 0 ? (
        <Card className="text-center py-12 text-gray-600">No saved addresses yet.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address, index) => (
            <Card key={`${address.street}-${index}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  {address.isDefault && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">Default</span>
                  )}
                </div>
                <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-red-500" disabled={saving}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(index)}
                  className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  disabled={saving}
                >
                  <Check className="w-3.5 h-3.5" /> Set as default
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
