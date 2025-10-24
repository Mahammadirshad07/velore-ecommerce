import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Toast from '../../components/admin/Toast';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    image: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setToast({ message: 'Failed to load products', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = editingProduct 
      ? `http://localhost:5000/products/${editingProduct.id}`
      : 'http://localhost:5000/products';
    
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        })
      });

      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
      
      setToast({ 
        message: editingProduct ? 'Product updated successfully!' : 'Product added successfully!', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Error saving product:', error);
      setToast({ message: 'Failed to save product', type: 'error' });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:5000/products/${id}`, {
          method: 'DELETE'
        });
        fetchProducts();
        setToast({ message: 'Product deleted successfully!', type: 'success' });
      } catch (error) {
        console.error('Error deleting product:', error);
        setToast({ message: 'Failed to delete product', type: 'error' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      brand: '',
      image: '',
      stock: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    resetForm();
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Product Management</h1>
          <button onClick={() => setShowForm(true)} style={styles.addBtn}>
            ➕ Add New Product
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {showForm && (
              <div style={styles.modalOverlay}>
                <div style={styles.formContainer}>
                  <h2 style={styles.formTitle}>
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Product Name *</label>
                        <input
                          type="text"
                          placeholder="e.g., Dior Sauvage"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          style={styles.input}
                          required
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Price (₹) *</label>
                        <input
                          type="number"
                          placeholder="e.g., 5999"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          style={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Description *</label>
                      <textarea
                        placeholder="Product description..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows="3"
                        style={{...styles.input, resize: 'vertical'}}
                        required
                      />
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          style={styles.input}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="for-men">For Men</option>
                          <option value="for-women">For Women</option>
                          <option value="niche">Niche</option>
                        </select>
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Brand *</label>
                        <input
                          type="text"
                          placeholder="e.g., Dior, Chanel"
                          value={formData.brand}
                          onChange={(e) => setFormData({...formData, brand: e.target.value})}
                          style={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Image URL *</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          style={styles.input}
                          required
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Stock *</label>
                        <input
                          type="number"
                          placeholder="e.g., 50"
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: e.target.value})}
                          style={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div style={styles.formActions}>
                      <button type="submit" style={styles.saveBtn}>
                        {editingProduct ? '💾 Update Product' : '✅ Add Product'}
                      </button>
                      <button type="button" onClick={handleCancel} style={styles.cancelBtn}>
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Image</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Brand</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Stock</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{textAlign: 'center', padding: '2rem', color: '#aaa'}}>
                        No products found. Add your first product!
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} style={styles.tableRow}>
                        <td style={styles.td}>{product.id}</td>
                        <td style={styles.td}>
                          <img src={product.image} alt={product.name} style={styles.productImg} />
                        </td>
                        <td style={styles.td}>{product.name}</td>
                        <td style={styles.td}>{product.brand}</td>
                        <td style={styles.td}>
                          <span style={styles.categoryBadge}>{product.category}</span>
                        </td>
                        <td style={styles.td}>₹{product.price}</td>
                        <td style={styles.td}>
                          <span style={product.stock > 10 ? styles.stockGood : styles.stockLow}>
                            {product.stock}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => handleEdit(product)} style={styles.editBtn}>
                            ✏️ Edit
                          </button>
                          <button onClick={() => handleDelete(product.id)} style={styles.deleteBtn}>
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.5rem',
    color: '#FFD700',
    margin: 0,
  },
  addBtn: {
    padding: '0.8rem 1.5rem',
    background: '#FFD700',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
  },
  formContainer: {
    background: '#1a1a1a',
    border: '2px solid #FFD700',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  formTitle: {
    color: '#FFD700',
    marginBottom: '1.5rem',
    fontFamily: "'Cormorant Garamond', serif",
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    color: '#FFD700',
    fontWeight: 600,
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.95rem',
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  saveBtn: {
    flex: 1,
    padding: '0.9rem',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    padding: '0.9rem',
    background: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  tableContainer: {
    background: '#1a1a1a',
    border: '2px solid #333',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    background: '#0a0a0a',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    color: '#FFD700',
    fontWeight: 600,
    borderBottom: '2px solid #333',
  },
  tableRow: {
    borderBottom: '1px solid #333',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #333',
  },
  productImg: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '0.3rem 0.8rem',
    background: '#FFD700',
    color: '#000',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  stockGood: {
    color: '#4CAF50',
    fontWeight: 600,
  },
  stockLow: {
    color: '#ff4444',
    fontWeight: 600,
  },
  editBtn: {
    padding: '0.5rem 0.8rem',
    background: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    fontSize: '0.85rem',
  },
  deleteBtn: {
    padding: '0.5rem 0.8rem',
    background: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
};

export default ProductManagement;
