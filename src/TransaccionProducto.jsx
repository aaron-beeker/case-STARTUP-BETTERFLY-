import React, { useState, useEffect } from 'react';
import { dataConnect } from './firebaseConfig'; 
import { 
  registrarProveedor, 
  registrarBeneficio, 
  listarProveedores, 
  listarBeneficios,
  eliminarBeneficio,
  eliminarProveedor
} from './generated/data';

const TransaccionProducto = () => {
  // Tabs: 'beneficio' (Registrar Beneficio) y 'proveedor' (Registrar Proveedor)
  const [activoTab, setActivoTab] = useState('beneficio');

  // Estado para el Beneficio
  const [beneficio, setBeneficio] = useState({
    nombreBeneficio: '',
    categoria: 'Seguro Dinámico',
    valorEconomico: '',
    costoPuntosGamificacion: 100,
    proveedorId: ''
  });

  // Estado para el Proveedor
  const [proveedor, setProveedor] = useState({
    razonSocial: '',
    tipoSocio: 'Aseguradora',
    emailContacto: ''
  });

  // Listas de datos
  const [listaBeneficios, setListaBeneficios] = useState([]);
  const [listaProveedores, setListaProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar datos relacionales desde la base de datos PostgreSQL
  const cargarDatos = async () => {
    console.log("%c[SISTEMA DISTRIBUIDO] 📡 Iniciando conexión con Cloud SQL (PostgreSQL)...", "color: #10b981; font-weight: bold;");
    try {
      setCargando(true);
      
      // Obtener proveedores y beneficios en paralelo
      const [resProveedores, resBeneficios] = await Promise.all([
        listarProveedores(dataConnect),
        listarBeneficios(dataConnect)
      ]);

      const proveedores = resProveedores.data?.proveedorAsociados || [];
      const beneficios = resBeneficios.data?.beneficioCatalogos || [];

      setListaProveedores(proveedores);
      setListaBeneficios(beneficios);
      console.log(`%c[SISTEMA DISTRIBUIDO] 📥 Datos recuperados de PostgreSQL - Proveedores: ${proveedores.length} | Beneficios: ${beneficios.length}`, "color: #8b5cf6; font-weight: bold;");

      // Auto-seleccionar el primer proveedor si está disponible y el estado está vacío
      if (proveedores.length > 0) {
        setBeneficio(prev => ({ 
          ...prev, 
          proveedorId: prev.proveedorId || proveedores[0].id 
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

    // Consulta en tiempo real: sondeo (polling) cada 4 segundos
    const intervalo = setInterval(() => {
      cargarDatos();
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  const manejarCambioBeneficio = (e) => {
    const { name, value } = e.target;
    setBeneficio({ 
      ...beneficio, 
      [name]: name === 'valorEconomico' || name === 'costoPuntosGamificacion' 
        ? (value === '' ? '' : Number(value)) 
        : value 
    });
  };

  const manejarCambioProveedor = (e) => {
    const { name, value } = e.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  // Acción para guardar el Proveedor
  const ejecutarRegistrarProveedor = async (e) => {
    e.preventDefault();
    if (!proveedor.razonSocial || !proveedor.tipoSocio || !proveedor.emailContacto) {
      alert("Por favor completa todos los campos del proveedor.");
      return;
    }

    try {
      await registrarProveedor(dataConnect, {
        razonSocial: proveedor.razonSocial,
        tipoSocio: proveedor.tipoSocio,
        emailContacto: proveedor.emailContacto
      });
      console.log("%c[BASE DE DATOS] ✅ Integridad referencial actualizada: Nuevo Proveedor Asociado registrado en PostgreSQL.", "color: #8b5cf6; font-weight: bold;");

      alert("¡Proveedor registrado con éxito en PostgreSQL!");
      
      // Limpiar formulario de proveedor
      setProveedor({ razonSocial: '', tipoSocio: 'Aseguradora', emailContacto: '' });

      // Recargar datos y cambiar al tab de beneficio
      await cargarDatos();
      setActivoTab('beneficio');
    } catch (error) {
      console.error("Error al registrar proveedor: ", error);
      alert("Error al conectar con la base de datos relacional para registrar proveedor.");
    }
  };

  // Acción para guardar el Beneficio
  const ejecutarRegistrarBeneficio = async (e) => {
    e.preventDefault();
    if (!beneficio.nombreBeneficio || !beneficio.valorEconomico || !beneficio.proveedorId) {
      alert("Por favor completa los campos obligatorios y selecciona un proveedor.");
      return;
    }

    console.log("%c[API GATEWAY] 📤 Preparando Payload JSON para envío al Backend:", "color: #3b82f6; font-weight: bold;", {
      nombreBeneficio: beneficio.nombreBeneficio,
      categoria: beneficio.categoria,
      valorEconomico: Number(beneficio.valorEconomico),
      costoPuntosGamificacion: Number(beneficio.costoPuntosGamificacion),
      proveedorId: beneficio.proveedorId
    });

    try {
      await registrarBeneficio(dataConnect, {
        nombreBeneficio: beneficio.nombreBeneficio,
        categoria: beneficio.categoria,
        valorEconomico: Number(beneficio.valorEconomico),
        costoPuntosGamificacion: Number(beneficio.costoPuntosGamificacion),
        proveedorId: beneficio.proveedorId
      });
      console.log("%c[BASE DE DATOS] ✅ Transacción ACID completada con éxito. Registro insertado en la tabla BENEFICIO_CATALOGO.", "color: #10b981; font-weight: bold;");

      alert("¡Beneficio registrado con éxito en PostgreSQL vinculado al proveedor!");

      // Limpiar formulario de beneficio (excepto categorías y proveedor seleccionado)
      setBeneficio({
        ...beneficio,
        nombreBeneficio: '',
        valorEconomico: '',
        costoPuntosGamificacion: 100
      });

      // Recargar datos
      await cargarDatos();
    } catch (error) {
      console.error("Error al registrar beneficio: ", error);
      alert("Error al registrar beneficio. Verifica la conexión con Cloud SQL / Postgres.");
    }
  };

  // Acción para eliminar un Beneficio
  const ejecutarEliminarBeneficio = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este beneficio?")) {
      return;
    }

    try {
      await eliminarBeneficio(dataConnect, { id });
      console.log(`%c[BASE DE DATOS] 🗑️ Transacción ACID completada con éxito. Registro eliminado de la tabla BENEFICIO_CATALOGO (ID: ${id}).`, "color: #ef4444; font-weight: bold;");
      alert("¡Beneficio eliminado con éxito!");
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar beneficio: ", error);
      alert("Error al eliminar el beneficio. Verifica la conexión con la base de datos.");
    }
  };

  // Acción para eliminar un Proveedor
  const ejecutarEliminarProveedor = async (id) => {
    // Validar si tiene beneficios asociados antes de eliminar
    const tieneBeneficios = listaBeneficios.some(b => b.proveedor?.id === id);
    if (tieneBeneficios) {
      alert("No se puede eliminar este proveedor porque tiene beneficios asociados. Por favor, elimina primero sus beneficios.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      return;
    }

    try {
      await eliminarProveedor(dataConnect, { id });
      console.log(`%c[BASE DE DATOS] 🗑️ Integridad referencial: Proveedor Asociado eliminado de PostgreSQL (ID: ${id}).`, "color: #ef4444; font-weight: bold;");
      alert("¡Proveedor eliminado con éxito!");
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar proveedor: ", error);
      alert("Error al eliminar el proveedor. Puede que tenga beneficios asociados que no se han refrescado localmente.");
    }
  };

  return (
    <div className="srm-container">
      {/* Estilos CSS premium para autocontención y diseño interactivo */}
      <style>{`
        .srm-container {
          font-family: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
          background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.12) 0%, rgba(139, 92, 246, 0.06) 90%), #0e0e13;
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
          background: linear-gradient(135deg, #10b981 0%, #8b5cf6 100%);
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
          color: #10b981;
          background: rgba(16, 185, 129, 0.10);
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .srm-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
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
          background: #10b981;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
          border-color: rgba(16, 185, 129, 0.3);
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
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
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
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        .srm-btn {
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
          border: none;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          padding: 14px 20px;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
        }

        .srm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.5);
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
          padding: 2px 8px;
          border-radius: 100px;
          font-weight: 600;
        }

        .srm-item-nicho.seguro {
          background: rgba(139, 92, 246, 0.15);
          color: #a78bfa;
        }

        .srm-item-nicho.regalo {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }

        .srm-item-nicho.donacion {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
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
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 10px;
          padding: 12px;
          font-size: 13px;
          color: #a78bfa;
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
        <span className="srm-brand">Betterfly SRM</span>
        <h1 className="srm-title">Betterfly SRM</h1>
        <p className="srm-subtitle">Gestión de Recompensas y Donaciones</p>
      </div>

      <div className="srm-status">
        <span className="srm-status-dot"></span>
        SQL Connect (Cloud SQL PostgreSQL)
      </div>

      {/* Selector de Pestaña de Formulario */}
      <div className="srm-tabs">
        <button 
          className={`srm-tab-btn ${activoTab === 'beneficio' ? 'active' : ''}`}
          onClick={() => setActivoTab('beneficio')}
        >
          Registrar Beneficio
        </button>
        <button 
          className={`srm-tab-btn ${activoTab === 'proveedor' ? 'active' : ''}`}
          onClick={() => setActivoTab('proveedor')}
        >
          Registrar Proveedor
        </button>
      </div>

      <div className="srm-grid">
        {/* Panel Izquierdo: Formulario Dinámico según Pestaña */}
        <div className="srm-card">
          {activoTab === 'beneficio' ? (
            // FORMULARIO: REGISTRAR BENEFICIO
            <>
              <div className="srm-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Registrar Beneficio del Catálogo
              </div>

              {listaProveedores.length === 0 && (
                <div className="srm-info-note">
                  ⚠️ No hay proveedores registrados en la base de datos. Por favor, ve primero a la pestaña <strong>"Registrar Proveedor"</strong> para crear uno antes de registrar beneficios.
                </div>
              )}

              <form onSubmit={ejecutarRegistrarBeneficio}>
                <div className="srm-form-group">
                  <label className="srm-label">Nombre del Beneficio *</label>
                  <input 
                    type="text" 
                    name="nombreBeneficio" 
                    className="srm-input" 
                    placeholder="Ej. Seguro de Vida Flexible o Giftcard Gimnasio"
                    value={beneficio.nombreBeneficio}
                    onChange={manejarCambioBeneficio}
                    required
                  />
                </div>

                <div className="srm-row-2">
                  <div className="srm-form-group">
                    <label className="srm-label">Categoría</label>
                    <select name="categoria" className="srm-select" value={beneficio.categoria} onChange={manejarCambioBeneficio}>
                      <option value="Seguro Dinámico">Seguro Dinámico</option>
                      <option value="Tarjeta de Regalo">Tarjeta de Regalo</option>
                      <option value="Donación Social">Donación Social</option>
                    </select>
                  </div>

                  <div className="srm-form-group">
                    <label className="srm-label">Valor Económico (USD) *</label>
                    <input 
                      type="number" 
                      name="valorEconomico" 
                      className="srm-input" 
                      placeholder="0.00"
                      min="0.01"
                      step="0.01"
                      value={beneficio.valorEconomico}
                      onChange={manejarCambioBeneficio}
                      required
                    />
                  </div>
                </div>

                <div className="srm-row-2">
                  <div className="srm-form-group">
                    <label className="srm-label">Proveedor Responsable *</label>
                    <select 
                      name="proveedorId" 
                      className="srm-select" 
                      value={beneficio.proveedorId} 
                      onChange={manejarCambioBeneficio}
                      required
                      disabled={listaProveedores.length === 0}
                    >
                      {listaProveedores.length === 0 ? (
                        <option value="">-- Sin proveedores --</option>
                      ) : (
                        listaProveedores.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.razonSocial} ({p.tipoSocio})
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="srm-form-group">
                    <label className="srm-label">Costo en Puntos de Gamificación</label>
                    <div className="srm-slider-container">
                      <div className="srm-slider-header">
                        <span>Puntos requeridos</span>
                        <span style={{ fontWeight: '700', color: '#10b981' }}>{beneficio.costoPuntosGamificacion} pts</span>
                      </div>
                      <input 
                        type="range" 
                        name="costoPuntosGamificacion" 
                        min="10" 
                        max="1000" 
                        step="10"
                        className="srm-slider"
                        value={beneficio.costoPuntosGamificacion}
                        onChange={manejarCambioBeneficio}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="srm-btn" disabled={listaProveedores.length === 0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Persistir Beneficio en Cloud SQL
                </button>
              </form>
            </>
          ) : (
            // FORMULARIO: REGISTRAR PROVEEDOR
            <>
              <div className="srm-card-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Registrar Proveedor Asociado
              </div>

              <form onSubmit={ejecutarRegistrarProveedor}>
                <div className="srm-form-group">
                  <label className="srm-label">Razón Social *</label>
                  <input 
                    type="text" 
                    name="razonSocial" 
                    className="srm-input" 
                    placeholder="Ej. SeguroVida S.A. o Fundación Planeta Verde"
                    value={proveedor.razonSocial}
                    onChange={manejarCambioProveedor}
                    required
                  />
                </div>

                <div className="srm-row-2">
                  <div className="srm-form-group">
                    <label className="srm-label">Tipo de Socio</label>
                    <select name="tipoSocio" className="srm-select" value={proveedor.tipoSocio} onChange={manejarCambioProveedor}>
                      <option value="Aseguradora">Aseguradora</option>
                      <option value="Marca de Bienestar">Marca de Bienestar</option>
                      <option value="ONG">ONG</option>
                    </select>
                  </div>

                  <div className="srm-form-group">
                    <label className="srm-label">Email de Contacto *</label>
                    <input 
                      type="email" 
                      name="emailContacto" 
                      className="srm-input" 
                      placeholder="contacto@proveedor.com"
                      value={proveedor.emailContacto}
                      onChange={manejarCambioProveedor}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="srm-btn" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Crear Proveedor en PostgreSQL
                </button>
              </form>
            </>
          )}
        </div>

        {/* Panel Derecho: Lista Relacional de Beneficios o Proveedores según tab */}
        <div className="srm-card">
          <div className="srm-card-title">
            {activoTab === 'beneficio' ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Beneficios en Cloud SQL
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Proveedores en Cloud SQL
              </>
            )}
          </div>

          <div className="srm-recent-list">
            {cargando ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af' }}>
                Consultando base de datos relacional...
              </div>
            ) : activoTab === 'beneficio' ? (
              listaBeneficios.length === 0 ? (
                <div className="srm-no-items">
                  Aún no hay beneficios registrados en PostgreSQL. ¡Crea un proveedor y luego registra un beneficio!
                </div>
              ) : (
                listaBeneficios.map((item) => {
                  const itemPrecio = Number(item.valorEconomico) || 0;
                  
                  // Asignar clase de nicho / categoria
                  let catClase = 'seguro';
                  if (item.categoria === 'Tarjeta de Regalo') catClase = 'regalo';
                  if (item.categoria === 'Donación Social') catClase = 'donacion';

                  return (
                    <div key={item.id} className="srm-recent-item">
                      <div className="srm-item-header">
                        <span className="srm-item-title">{item.nombreBeneficio}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className={`srm-item-nicho ${catClase}`}>{item.categoria}</span>
                          <button 
                            className="srm-delete-btn" 
                            title="Eliminar Beneficio"
                            onClick={() => ejecutarEliminarBeneficio(item.id)}
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
                          Costo Real: <strong style={{ color: '#ffffff' }}>${itemPrecio.toFixed(2)} USD</strong>
                        </div>
                        <div>
                          Puntos: <strong style={{ color: '#10b981' }}>{item.costoPuntosGamificacion} pts</strong>
                        </div>
                      </div>
                      <div className="srm-item-details" style={{ fontSize: '12px', borderTop: '1px dashed rgba(255, 255, 255, 0.05)', paddingTop: '6px', color: '#a78bfa' }}>
                        Proveedor: <strong>{item.proveedor?.razonSocial || 'Desconocido'}</strong>
                      </div>
                      <div className="srm-item-id">
                        UUID Registro: {item.id}
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              listaProveedores.length === 0 ? (
                <div className="srm-no-items">
                  Aún no hay proveedores registrados en PostgreSQL. ¡Registra tu primer proveedor!
                </div>
              ) : (
                listaProveedores.map((item) => {
                  return (
                    <div key={item.id} className="srm-recent-item">
                      <div className="srm-item-header">
                        <span className="srm-item-title" style={{ color: '#8b5cf6' }}>{item.razonSocial}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="srm-item-nicho seguro" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>{item.tipoSocio}</span>
                          <button 
                            className="srm-delete-btn" 
                            title="Eliminar Proveedor"
                            onClick={() => ejecutarEliminarProveedor(item.id)}
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
                          Email: <strong style={{ color: '#ffffff' }}>{item.emailContacto}</strong>
                        </div>
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