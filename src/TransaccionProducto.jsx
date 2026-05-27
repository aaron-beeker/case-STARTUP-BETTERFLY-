import React, { useState, useEffect } from 'react';
import { dataConnect } from './firebaseConfig'; 
import { 
  registrarProductor, 
  registrarProducto, 
  listarProductores, 
  listarProductos,
  eliminarProducto,
  eliminarProductor
} from './generated/data';

const TransaccionProducto = () => {
  // Tabs: 'producto' (Registrar Producto) y 'productor' (Registrar Productor)
  const [activoTab, setActivoTab] = useState('producto');

  // Estado para el Producto Digital
  const [producto, setProducto] = useState({
    title: '',
    format: 'Curso en línea',
    niche: 'Negocios',
    basePrice: '',
    affiliateCommission: 80, // Hasta 80% según reglas de Hotmart
    producerId: ''
  });

  // Estado para el Productor
  const [productor, setProductor] = useState({
    fullName: '',
    contactEmail: '',
    bankAccount: ''
  });

  // Listas de datos
  const [listaProductos, setListaProductos] = useState([]);
  const [listaProductores, setListaProductores] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar datos relacionales desde la base de datos PostgreSQL
  const cargarDatos = async () => {
    try {
      setCargando(true);
      
      // Obtener productores y productos en paralelo
      const [resProductores, resProductos] = await Promise.all([
        listarProductores(dataConnect),
        listarProductos(dataConnect)
      ]);

      const productores = resProductores.data?.producers || [];
      const productos = resProductos.data?.digitalProducts || [];

      setListaProductores(productores);
      setListaProductos(productos);

      // Auto-seleccionar el primer productor si está disponible y el estado está vacío
      if (productores.length > 0) {
        setProducto(prev => ({ 
          ...prev, 
          producerId: prev.producerId || productores[0].id 
        }));
      }
    } catch (error) {
      console.error("Error al cargar datos desde SQL Connect: ", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const manejarCambioProducto = (e) => {
    const { name, value } = e.target;
    setProducto({ 
      ...producto, 
      [name]: name === 'basePrice' || name === 'affiliateCommission' 
        ? (value === '' ? '' : Number(value)) 
        : value 
    });
  };

  const manejarCambioProductor = (e) => {
    const { name, value } = e.target;
    setProductor({ ...productor, [name]: value });
  };

  // Acción para guardar el Productor
  const ejecutarRegistrarProductor = async (e) => {
    e.preventDefault();
    if (!productor.fullName || !productor.contactEmail || !productor.bankAccount) {
      alert("Por favor completa todos los campos del productor.");
      return;
    }

    try {
      await registrarProductor(dataConnect, {
        fullName: productor.fullName,
        contactEmail: productor.contactEmail,
        bankAccount: productor.bankAccount
      });

      alert("¡Productor registrado con éxito en PostgreSQL!");
      
      // Limpiar formulario de productor
      setProductor({ fullName: '', contactEmail: '', bankAccount: '' });

      // Recargar datos y cambiar al tab de producto
      await cargarDatos();
      setActivoTab('producto');
    } catch (error) {
      console.error("Error al registrar productor: ", error);
      alert("Error al conectar con la base de datos relacional para registrar productor.");
    }
  };

  // Acción para guardar el Producto
  const ejecutarRegistrarProducto = async (e) => {
    e.preventDefault();
    if (!producto.title || !producto.basePrice || !producto.producerId) {
      alert("Por favor completa los campos obligatorios y selecciona un productor.");
      return;
    }

    try {
      // Guardar el producto con referencia (foreign key) al productor
      await registrarProducto(dataConnect, {
        title: producto.title,
        format: producto.format,
        niche: producto.niche,
        basePrice: Number(producto.basePrice),
        affiliateCommission: Number(producto.affiliateCommission),
        producerId: producto.producerId
      });

      alert("¡Producto registrado con éxito en PostgreSQL vinculado al productor!");

      // Limpiar formulario de producto (excepto categorías y productor seleccionado)
      setProducto({
        ...producto,
        title: '',
        basePrice: '',
        affiliateCommission: 80
      });

      // Recargar datos
      await cargarDatos();
    } catch (error) {
      console.error("Error al registrar producto: ", error);
      alert("Error al registrar producto. Verifica la conexión con Cloud SQL / Postgres.");
    }
  };

  // Acción para eliminar un Producto
  const ejecutarEliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      await eliminarProducto(dataConnect, { id });
      alert("¡Producto eliminado con éxito!");
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
      alert("Error al eliminar el producto. Verifica la conexión con la base de datos.");
    }
  };

  // Acción para eliminar un Productor
  const ejecutarEliminarProductor = async (id) => {
    // Validar si tiene productos asociados en el estado local antes de llamar a la DB
    const tieneProductos = listaProductos.some(p => p.producer?.id === id);
    if (tieneProductos) {
      alert("No se puede eliminar este productor porque tiene productos digitales asociados. Por favor, elimina primero sus productos.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que deseas eliminar este productor?")) {
      return;
    }

    try {
      await eliminarProductor(dataConnect, { id });
      alert("¡Productor eliminado con éxito!");
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar productor: ", error);
      alert("Error al eliminar el productor. Puede que tenga productos asociados que no se han refrescado localmente.");
    }
  };

  // Cálculos dinámicos de comisiones
  const precio = Number(producto.basePrice) || 0;
  const comisionVal = Number(producto.affiliateCommission) || 0;
  const gananciaAfiliado = (precio * (comisionVal / 100)).toFixed(2);
  const gananciaProductor = (precio * (1 - comisionVal / 100)).toFixed(2);

  return (
    <div className="srm-container">
      {/* Estilos CSS premium para autocontención y diseño interactivo */}
      <style>{`
        .srm-container {
          font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
          background: radial-gradient(circle at 10% 20%, rgba(90, 18, 222, 0.1) 0%, rgba(0, 0, 0, 0) 90%), #0e0e13;
          color: #f3f4f6;
          min-height: 100vh;
          padding: 40px 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .srm-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .srm-brand {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          background: linear-gradient(135deg, #ff5a19 0%, #ff9f43 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
          display: inline-block;
        }

        .srm-title {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -1px;
        }

        .srm-subtitle {
          color: #9ca3af;
          font-size: 16px;
          margin-top: 8px;
        }

        .srm-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #00bcd4;
          background: rgba(0, 188, 212, 0.10);
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .srm-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00bcd4;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 188, 212, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 188, 212, 0); }
        }

        .srm-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 450px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .srm-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: #9ca3af;
          padding: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .srm-tab-btn.active {
          background: #ff5a19;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(255, 90, 25, 0.3);
        }

        .srm-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
          width: 100%;
          max-width: 1100px;
        }

        @media (max-width: 900px) {
          .srm-grid {
            grid-template-columns: 1fr;
          }
        }

        .srm-card {
          background: rgba(22, 22, 33, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .srm-card:hover {
          border-color: rgba(255, 90, 25, 0.3);
        }

        .srm-card-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }

        .srm-form-group {
          margin-bottom: 20px;
        }

        .srm-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #d1d5db;
          margin-bottom: 8px;
          text-align: left;
        }

        .srm-input, .srm-select {
          width: 100%;
          background: rgba(14, 14, 20, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 15px;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .srm-input:focus, .srm-select:focus {
          outline: none;
          border-color: #ff5a19;
          box-shadow: 0 0 0 3px rgba(255, 90, 25, 0.2);
        }

        .srm-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .srm-slider-container {
          background: rgba(0, 0, 0, 0.2);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .srm-slider-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
          color: #9ca3af;
        }

        .srm-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #2e303a;
          outline: none;
          margin: 10px 0;
        }

        .srm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff5a19;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 90, 25, 0.5);
        }

        .srm-split-preview {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
          font-size: 13px;
        }

        .srm-split-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .srm-split-val {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2px;
        }

        .srm-split-val.producer {
          color: #10b981;
        }

        .srm-split-val.affiliate {
          color: #ff9f43;
        }

        .srm-btn {
          width: 100%;
          background: linear-gradient(135deg, #ff5a19 0%, #ff7730 50%, #ff9f43 100%);
          border: none;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          padding: 14px 20px;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(255, 90, 25, 0.35);
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
        }

        .srm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 90, 25, 0.5);
        }

        .srm-recent-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .srm-recent-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
          transition: all 0.2s ease;
        }

        .srm-recent-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .srm-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .srm-item-title {
          font-weight: 700;
          color: #ffffff;
          font-size: 15px;
        }

        .srm-item-nicho {
          font-size: 11px;
          background: rgba(255, 90, 25, 0.15);
          color: #ff7730;
          padding: 2px 8px;
          border-radius: 100px;
          font-weight: 600;
        }

        .srm-item-details {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #9ca3af;
        }

        .srm-item-id {
          font-family: monospace;
          font-size: 10px;
          color: #6b7280;
          margin-top: 4px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 4px;
        }

        .srm-no-items {
          color: #6b7280;
          font-size: 14px;
          padding: 32px 0;
          text-align: center;
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .srm-info-note {
          background: rgba(255, 159, 67, 0.1);
          border: 1px solid rgba(255, 159, 67, 0.3);
          border-radius: 10px;
          padding: 12px;
          font-size: 13px;
          color: #ff9f43;
          text-align: left;
          margin-bottom: 20px;
        }

        .srm-delete-btn {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .srm-delete-btn:hover {
          background: #ef4444;
          color: #ffffff;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
          transform: scale(1.08);
        }
      `}</style>

      <div className="srm-header">
        <span className="srm-brand">Startup Homart</span>
        <h1 className="srm-title">Hotmart SRM</h1>
        <p className="srm-subtitle">Gestión de Transacciones de Productos Digitales</p>
      </div>

      <div className="srm-status">
        <span className="srm-status-dot"></span>
        SQL Connect (Cloud SQL PostgreSQL)
      </div>

      {/* Selector de Pestaña de Formulario */}
      <div className="srm-tabs">
        <button 
          className={`srm-tab-btn ${activoTab === 'producto' ? 'active' : ''}`}
          onClick={() => setActivoTab('producto')}
        >
          Registrar Producto
        </button>
        <button 
          className={`srm-tab-btn ${activoTab === 'productor' ? 'active' : ''}`}
          onClick={() => setActivoTab('productor')}
        >
          Registrar Productor
        </button>
      </div>

      <div className="srm-grid">
        {/* Panel Izquierdo: Formulario Dinámico según Pestaña */}
        <div className="srm-card">
          {activoTab === 'producto' ? (
            // FORMULARIO: REGISTRAR PRODUCTO
            <>
              <div className="srm-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5a19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Registrar Producto Digital
              </div>

              {listaProductores.length === 0 && (
                <div className="srm-info-note">
                  ⚠️ No hay productores registrados en la base de datos. Por favor, ve primero a la pestaña <strong>"Registrar Productor"</strong> para crear uno antes de registrar productos.
                </div>
              )}

              <form onSubmit={ejecutarRegistrarProducto}>
                <div className="srm-form-group">
                  <label className="srm-label">Título del Producto *</label>
                  <input 
                    type="text" 
                    name="title" 
                    className="srm-input" 
                    placeholder="Ej. Curso Completo de Hotmart Marketing"
                    value={producto.title}
                    onChange={manejarCambioProducto}
                    required
                  />
                </div>

                <div className="srm-row-2">
                  <div className="srm-form-group">
                    <label className="srm-label">Formato</label>
                    <select name="format" className="srm-select" value={producto.format} onChange={manejarCambioProducto}>
                      <option value="Curso en línea">Curso en línea</option>
                      <option value="Ebook / PDF">Ebook / PDF</option>
                      <option value="Suscripción / Membresía">Suscripción</option>
                      <option value="Audio / Podcast">Audio / Podcast</option>
                      <option value="Evento / Mentoría">Evento / Mentoría</option>
                    </select>
                  </div>

                  <div className="srm-form-group">
                    <label className="srm-label">Nicho</label>
                    <select name="niche" className="srm-select" value={producto.niche} onChange={manejarCambioProducto}>
                      <option value="Negocios">Negocios</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Desarrollo Personal">Desarrollo Personal</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Salud y Fitness">Salud y Fitness</option>
                    </select>
                  </div>
                </div>

                <div className="srm-row-2">
                  <div className="srm-form-group">
                    <label className="srm-label">Precio Base (USD) *</label>
                    <input 
                      type="number" 
                      name="basePrice" 
                      className="srm-input" 
                      placeholder="0.00"
                      min="0.99"
                      step="0.01"
                      value={producto.basePrice}
                      onChange={manejarCambioProducto}
                      required
                    />
                  </div>

                  <div className="srm-form-group">
                    <label className="srm-label">Productor Responsable *</label>
                    <select 
                      name="producerId" 
                      className="srm-select" 
                      value={producto.producerId} 
                      onChange={manejarCambioProducto}
                      required
                      disabled={listaProductores.length === 0}
                    >
                      {listaProductores.length === 0 ? (
                        <option value="">-- Sin productores --</option>
                      ) : (
                        listaProductores.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.fullName} ({p.contactEmail})
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="srm-form-group" style={{ marginTop: '8px' }}>
                  <label className="srm-label">Comisión del Afiliado</label>
                  <div className="srm-slider-container">
                    <div className="srm-slider-header">
                      <span>Porcentaje de Comisión</span>
                      <span style={{ fontWeight: '700', color: '#ff9f43' }}>{producto.affiliateCommission}%</span>
                    </div>
                    <input 
                      type="range" 
                      name="affiliateCommission" 
                      min="0" 
                      max="80" 
                      className="srm-slider"
                      value={producto.affiliateCommission}
                      onChange={manejarCambioProducto}
                    />
                    
                    <div className="srm-split-preview">
                      <div className="srm-split-item">
                        <span style={{ color: '#9ca3af', fontSize: '11px' }}>Productor Recibe</span>
                        <span className="srm-split-val producer">${gananciaProductor} USD</span>
                      </div>
                      <div className="srm-split-item">
                        <span style={{ color: '#9ca3af', fontSize: '11px' }}>Afiliado Recibe</span>
                        <span className="srm-split-val affiliate">${gananciaAfiliado} USD</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="srm-btn" disabled={listaProductores.length === 0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Persistir Producto en Cloud SQL
                </button>
              </form>
            </>
          ) : (
            // FORMULARIO: REGISTRAR PRODUCTOR
            <>
              <div className="srm-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff9f43" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Registrar Nuevo Productor
              </div>

              <form onSubmit={ejecutarRegistrarProductor}>
                <div className="srm-form-group">
                  <label className="srm-label">Nombre Completo *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    className="srm-input" 
                    placeholder="Ej. Roberto Gómez Bolaños"
                    value={productor.fullName}
                    onChange={manejarCambioProductor}
                    required
                  />
                </div>

                <div className="srm-form-group">
                  <label className="srm-label">Email de Contacto *</label>
                  <input 
                    type="email" 
                    name="contactEmail" 
                    className="srm-input" 
                    placeholder="ejemplo@productor.com"
                    value={productor.contactEmail}
                    onChange={manejarCambioProductor}
                    required
                  />
                </div>

                <div className="srm-form-group">
                  <label className="srm-label">Cuenta Bancaria para Depósitos (IBAN/CCI) *</label>
                  <input 
                    type="text" 
                    name="bankAccount" 
                    className="srm-input" 
                    placeholder="Ej. ES12 3456 7890 1234 5678"
                    value={productor.bankAccount}
                    onChange={manejarCambioProductor}
                    required
                  />
                </div>

                <button type="submit" className="srm-btn" style={{ background: 'linear-gradient(135deg, #ff9f43 0%, #ff7730 100%)', boxShadow: '0 8px 24px rgba(255, 159, 67, 0.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Crear Productor en PostgreSQL
                </button>
              </form>
            </>
          )}
        </div>

        {/* Panel Derecho: Lista Relacional de Productos o Productores según tab */}
        <div className="srm-card">
          <div className="srm-card-title">
            {activoTab === 'producto' ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5a19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Productos en Cloud SQL
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff9f43" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Productores en Cloud SQL
              </>
            )}
          </div>

          <div className="srm-recent-list">
            {cargando ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af' }}>
                Consultando base de datos relacional...
              </div>
            ) : activoTab === 'producto' ? (
              listaProductos.length === 0 ? (
                <div className="srm-no-items">
                  Aún no hay productos registrados en PostgreSQL. ¡Crea un productor y luego registra un producto digital!
                </div>
              ) : (
                listaProductos.map((item) => {
                  const itemPrecio = Number(item.basePrice) || 0;
                  const itemComision = Number(item.affiliateCommission) || 0;
                  const itemGananciaProd = (itemPrecio * (1 - itemComision / 100)).toFixed(2);
                  
                  return (
                    <div key={item.id} className="srm-recent-item">
                      <div className="srm-item-header">
                        <span className="srm-item-title">{item.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="srm-item-nicho">{item.niche}</span>
                          <button 
                            className="srm-delete-btn" 
                            title="Eliminar Producto"
                            onClick={() => ejecutarEliminarProducto(item.id)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="srm-item-details">
                        <div>
                          Formato: <strong style={{ color: '#ffffff' }}>{item.format}</strong>
                        </div>
                        <div>
                          Precio: <strong style={{ color: '#ffffff' }}>${itemPrecio.toFixed(2)} USD</strong>
                        </div>
                      </div>
                      <div className="srm-item-details" style={{ fontSize: '12px', borderTop: '1px dashed rgba(255, 255, 255, 0.05)', paddingTop: '6px' }}>
                        <span>Comisión: {itemComision}%</span>
                        <span>Neto Productor: <strong style={{ color: '#10b981' }}>${itemGananciaProd} USD</strong></span>
                      </div>
                      <div className="srm-item-details" style={{ fontSize: '12px', color: '#ff9f43' }}>
                        Productor: <strong>{item.producer?.fullName || 'Desconocido'}</strong>
                      </div>
                      <div className="srm-item-id">
                        UUID Registro: {item.id}
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              listaProductores.length === 0 ? (
                <div className="srm-no-items">
                  Aún no hay productores registrados en PostgreSQL. ¡Registra tu primer productor!
                </div>
              ) : (
                listaProductores.map((item) => {
                  return (
                    <div key={item.id} className="srm-recent-item">
                      <div className="srm-item-header">
                        <span className="srm-item-title" style={{ color: '#ff9f43' }}>{item.fullName}</span>
                        <button 
                          className="srm-delete-btn" 
                          title="Eliminar Productor"
                          onClick={() => ejecutarEliminarProductor(item.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                      <div className="srm-item-details">
                        <div>
                          Email: <strong style={{ color: '#ffffff' }}>{item.contactEmail}</strong>
                        </div>
                      </div>
                      <div className="srm-item-details" style={{ fontSize: '12px', borderTop: '1px dashed rgba(255, 255, 255, 0.05)', paddingTop: '6px' }}>
                        <span>Cuenta Bancaria: <strong style={{ color: '#ffffff' }}>{item.bankAccount}</strong></span>
                      </div>
                      <div className="srm-item-id">
                        UUID Registro: {item.id}
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransaccionProducto;