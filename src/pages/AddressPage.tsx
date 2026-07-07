import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Icon from '../components/ui/AppIcon';
import userService from '../services/userService';
import type { Address } from '../services/authService';

const emptyAddress: Omit<Address, '_id'> = {
  street: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  isDefault: false,
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, '_id'>>(emptyAddress);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const response = await userService.getAddresses();
      if (response.success) {
        setAddresses(response.addresses);
      }
    } catch {
      setError('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setForm({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country || 'US',
      isDefault: address.isDefault || false,
    });
    setEditingId(address._id || null);
    setShowForm(true);
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm('Delete this address?')) return;
    try {
      await userService.deleteAddress(addressId);
      setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      setSuccess('Address deleted');
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError('Failed to delete address');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.street || !form.city || !form.state || !form.zip) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingId) {
        const response = await userService.updateAddress(editingId, { address: form });
        if (response.success) {
          setAddresses(response.addresses);
          setSuccess('Address updated');
        }
      } else {
        const response = await userService.addAddress({ address: form });
        if (response.success) {
          setAddresses(response.addresses);
          setSuccess('Address added');
        }
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyAddress);
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError('Failed to save address');
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      const response = await userService.updateAddress(addressId, {
        address: { isDefault: true },
      });
      if (response.success) {
        setAddresses(response.addresses);
        setSuccess('Default address updated');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch {
      setError('Failed to update default address');
    }
  };

  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader
          title="My Addresses"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'My Account', href: '/account' },
            { label: 'Addresses' },
          ]}
        />

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={18} className="text-green-600" />
            <p className="text-green-700 text-sm font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
            <Icon name="ExclamationTriangleIcon" size={18} className="text-red-600" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg p-5 border border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : addresses.length === 0 && !showForm ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <Icon name="MapPinIcon" size={40} className="text-gray-300 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-900 mb-1">No addresses yet</h2>
            <p className="text-sm text-gray-600 mb-4">Add an address for faster checkout.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary min-h-[44px] inline-flex"
            >
              <Icon name="PlusIcon" size={16} />
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr._id} className="bg-white rounded-lg p-5 border border-gray-200 flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm text-gray-900">
                    {addr.street}
                    {addr.isDefault && (
                      <span className="ml-2 text-xs bg-[var(--secondary)]/10 text-[var(--secondary)] px-2 py-0.5 rounded font-semibold">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr._id!)}
                      className="text-xs text-[var(--secondary)] font-semibold hover:underline"
                    >
                      Set Default
                    </button>
                  )}
                  <button onClick={() => handleEdit(addr)} className="text-xs text-gray-600 hover:text-gray-900">
                    <Icon name="PencilIcon" size={16} />
                  </button>
                  <button onClick={() => handleDelete(addr._id!)} className="text-xs text-red-600 hover:text-red-800">
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            ))}
            {!showForm && (
              <button
                onClick={() => {
                  setForm(emptyAddress);
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="btn-secondary w-full justify-center min-h-[44px]"
              >
                <Icon name="PlusIcon" size={16} />
                Add Address
              </button>
            )}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-5 sm:p-6 border border-gray-200 mt-4 space-y-4">
            <h3 className="font-bold text-gray-900">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <div>
              <label className="app-label mb-1.5 block">Street Address *</label>
              <input
                type="text"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className="input-field w-full min-h-[44px]"
                required
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="app-label mb-1.5 block">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input-field w-full min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="app-label mb-1.5 block">State *</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="input-field w-full min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="app-label mb-1.5 block">ZIP *</label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="input-field w-full min-h-[44px]"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">Set as default address</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(emptyAddress);
                }}
                className="btn-secondary min-h-[44px] flex-1 justify-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary min-h-[44px] flex-1 justify-center disabled:opacity-70"
              >
                {saving ? 'Saving...' : editingId ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
