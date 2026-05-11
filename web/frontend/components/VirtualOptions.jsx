import React, { useState } from 'react';

// Initial demo options
const generateId = () => Math.random().toString(36).substr(2, 9);

const initialOptions = [
  {
    id: generateId(),
    title: 'Size',
    type: 'dropdown',
    required: false,
    values: ['One Size', 'Small', 'Medium', 'Large'],
    preselectValue: '',
  },
  {
    id: generateId(),
    title: 'Color',
    type: 'dropdown',
    required: false,
    values: ['Default', 'Red', 'Blue', 'Green'],
    preselectValue: '',
  },
  {
    id: generateId(),
    title: 'Mobile',
    type: 'dropdown',
    required: true,
    values: ['iPhone', 'Samsung', 'Google Pixel'],
    preselectValue: '',
  },
];

const VirtualOptions = () => {
  const [options, setOptions] = useState(initialOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Preview state for user selections
  const [previewSelections, setPreviewSelections] = useState({});
  const [previewCheckboxSelections, setPreviewCheckboxSelections] = useState({});
  const [previewFileNames, setPreviewFileNames] = useState({});

  // New option form state
  const [newOption, setNewOption] = useState({
    title: '',
    type: 'dropdown',
    required: false,
    preselectValue: '',
    values: '',
    maxLength: '',
    inputType: 'text',
    htmlContent: '',
    xAxisTitle: '',
    xAxisKeys: '',
    yAxisTitle: '',
    yAxisKeys: '',
    colorValues: '',
    imageValues: '',
    preselectValues: '',
  });

  const openAddModal = () => {
    setEditingId(null);
    setNewOption({
      title: '',
      type: 'dropdown',
      required: false,
      preselectValue: '',
      values: '',
      maxLength: '',
      inputType: 'text',
      htmlContent: '',
      xAxisTitle: '',
      xAxisKeys: '',
      yAxisTitle: '',
      yAxisKeys: '',
      colorValues: '',
      imageValues: '',
      preselectValues: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (option) => {
    setEditingId(option.id);
    // Populate form based on option type
    if (option.type === 'dropdown' || option.type === 'buttons' || option.type === 'radio') {
      setNewOption({
        title: option.title,
        type: option.type,
        required: option.required,
        preselectValue: option.preselectValue,
        values: option.values.join(', '),
        maxLength: '',
        inputType: 'text',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        imageValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'checkboxes') {
      setNewOption({
        title: option.title,
        type: 'checkboxes',
        required: option.required,
        preselectValues: option.preselectValues.join(', '),
        values: option.values.join(', '),
        preselectValue: '',
        maxLength: '',
        inputType: 'text',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        imageValues: '',
      });
    } else if (option.type === 'text') {
      setNewOption({
        title: option.title,
        type: 'text',
        required: option.required,
        maxLength: option.maxLength || '',
        inputType: option.inputType || 'text',
        values: '',
        preselectValue: '',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        imageValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'longText') {
      setNewOption({
        title: option.title,
        type: 'longText',
        required: option.required,
        maxLength: option.maxLength || '',
        values: '',
        preselectValue: '',
        inputType: 'text',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        imageValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'fileUpload') {
      setNewOption({
        title: option.title,
        type: 'fileUpload',
        required: option.required,
        values: '',
        preselectValue: '',
        maxLength: '',
        inputType: 'text',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        imageValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'colorSwatches') {
      setNewOption({
        title: option.title,
        type: 'colorSwatches',
        required: option.required,
        preselectValue: option.preselectValue,
        colorValues: option.values.map(v => `${v.label}:${v.color}`).join(', '),
        values: '',
        maxLength: '',
        inputType: 'text',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        imageValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'imageSwatches') {
      setNewOption({
        title: option.title,
        type: 'imageSwatches',
        required: option.required,
        preselectValue: option.preselectValue,
        imageValues: option.values.map(v => `${v.label}:${v.imageUrl}`).join(', '),
        values: '',
        maxLength: '',
        inputType: 'text',
        htmlContent: '',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'grid') {
      setNewOption({
        title: option.title,
        type: 'grid',
        required: option.required,
        xAxisTitle: option.xAxisTitle,
        xAxisKeys: option.xAxisKeys.join(', '),
        yAxisTitle: option.yAxisTitle,
        yAxisKeys: option.yAxisKeys.join(', '),
        values: '',
        preselectValue: '',
        maxLength: '',
        inputType: 'text',
        htmlContent: '',
        colorValues: '',
        imageValues: '',
        preselectValues: '',
      });
    } else if (option.type === 'instructions') {
      setNewOption({
        title: option.title,
        type: 'instructions',
        required: option.required,
        htmlContent: option.htmlContent,
        values: '',
        preselectValue: '',
        maxLength: '',
        inputType: 'text',
        xAxisTitle: '',
        xAxisKeys: '',
        yAxisTitle: '',
        yAxisKeys: '',
        colorValues: '',
        imageValues: '',
        preselectValues: '',
      });
    }
    setIsModalOpen(true);
  };

  const saveOption = () => {
    let savedOption;
    const id = editingId || generateId();

    if (newOption.type === 'dropdown' || newOption.type === 'buttons' || newOption.type === 'radio') {
      savedOption = {
        id,
        title: newOption.title,
        type: newOption.type,
        required: newOption.required,
        values: newOption.values.split(',').map(v => v.trim()),
        preselectValue: newOption.preselectValue,
      };
    } else if (newOption.type === 'checkboxes') {
      savedOption = {
        id,
        title: newOption.title,
        type: 'checkboxes',
        required: newOption.required,
        values: newOption.values.split(',').map(v => v.trim()),
        preselectValues: newOption.preselectValues ? newOption.preselectValues.split(',').map(v => v.trim()) : [],
      };
    } else if (newOption.type === 'text') {
      savedOption = {
        id,
        title: newOption.title,
        type: 'text',
        required: newOption.required,
        maxLength: newOption.maxLength ? parseInt(newOption.maxLength) : undefined,
        inputType: newOption.inputType,
      };
    } else if (newOption.type === 'longText') {
      savedOption = {
        id,
        title: newOption.title,
        type: 'longText',
        required: newOption.required,
        maxLength: newOption.maxLength ? parseInt(newOption.maxLength) : undefined,
      };
    } else if (newOption.type === 'fileUpload') {
      savedOption = {
        id,
        title: newOption.title,
        type: 'fileUpload',
        required: newOption.required,
      };
    } else if (newOption.type === 'colorSwatches') {
      const colorItems = newOption.colorValues.split(',').map((item) => {
        const [label, color] = item.split(':');
        return { label: label.trim(), color: color?.trim() || '#000000' };
      });
      savedOption = {
        id,
        title: newOption.title,
        type: 'colorSwatches',
        required: newOption.required,
        values: colorItems,
        preselectValue: newOption.preselectValue,
      };
    } else if (newOption.type === 'imageSwatches') {
      const imageItems = newOption.imageValues.split(',').map((item) => {
        const [label, imageUrl] = item.split(':');
        return { label: label.trim(), imageUrl: imageUrl?.trim() || '' };
      });
      savedOption = {
        id,
        title: newOption.title,
        type: 'imageSwatches',
        required: newOption.required,
        values: imageItems,
        preselectValue: newOption.preselectValue,
      };
    } else if (newOption.type === 'grid') {
      savedOption = {
        id,
        title: newOption.title,
        type: 'grid',
        required: newOption.required,
        xAxisTitle: newOption.xAxisTitle,
        xAxisKeys: newOption.xAxisKeys.split(',').map(k => k.trim()),
        yAxisTitle: newOption.yAxisTitle,
        yAxisKeys: newOption.yAxisKeys.split(',').map(k => k.trim()),
      };
    } else {
      // instructions
      savedOption = {
        id,
        title: newOption.title,
        type: 'instructions',
        required: newOption.required,
        htmlContent: newOption.htmlContent,
      };
    }

    if (editingId) {
      setOptions(options.map(opt => (opt.id === editingId ? savedOption : opt)));
    } else {
      setOptions([...options, savedOption]);
    }
    setIsModalOpen(false);
  };

  const deleteOption = (id) => {
    setOptions(options.filter(opt => opt.id !== id));
    // Clean preview states
    const newSelections = { ...previewSelections };
    delete newSelections[id];
    setPreviewSelections(newSelections);
    const newCheckboxSelections = { ...previewCheckboxSelections };
    delete newCheckboxSelections[id];
    setPreviewCheckboxSelections(newCheckboxSelections);
  };

  // Preview handlers
  const handleDropdownChange = (id, value) => {
    setPreviewSelections({ ...previewSelections, [id]: value });
  };

  const handleRadioChange = (id, value) => {
    setPreviewSelections({ ...previewSelections, [id]: value });
  };

  const handleButtonSelect = (id, value) => {
    setPreviewSelections({ ...previewSelections, [id]: value });
  };

  const handleCheckboxToggle = (id, value, checked) => {
    const current = previewCheckboxSelections[id] || [];
    let updated;
    if (checked) {
      updated = [...current, value];
    } else {
      updated = current.filter(v => v !== value);
    }
    setPreviewCheckboxSelections({ ...previewCheckboxSelections, [id]: updated });
  };

  const handleColorSwatchSelect = (id, value) => {
    setPreviewSelections({ ...previewSelections, [id]: value });
  };

  const handleImageSwatchSelect = (id, value) => {
    setPreviewSelections({ ...previewSelections, [id]: value });
  };

  const handleFileUpload = (id, file) => {
    if (file) {
      setPreviewFileNames({ ...previewFileNames, [id]: file.name });
    } else {
      const newNames = { ...previewFileNames };
      delete newNames[id];
      setPreviewFileNames(newNames);
    }
  };

  // Render preview component based on option type
  const renderPreview = (option) => {
    const id = option.id;

    switch (option.type) {
      case 'dropdown':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={previewSelections[id] || ''}
              onChange={(e) => handleDropdownChange(id, e.target.value)}
              required={option.required}
            >
              <option value="">Choose one</option>
              {option.values.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        );

      case 'buttons':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-wrap gap-2">
              {option.values.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleButtonSelect(id, val)}
                  className={`px-4 py-2 border rounded-md transition ${
                    previewSelections[id] === val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        );

      case 'radio':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {option.values.map((val) => (
                <label key={val} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={id}
                    value={val}
                    checked={previewSelections[id] === val}
                    onChange={() => handleRadioChange(id, val)}
                    required={option.required}
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkboxes':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {option.values.map((val) => (
                <label key={val} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={val}
                    checked={(previewCheckboxSelections[id] || []).includes(val)}
                    onChange={(e) => handleCheckboxToggle(id, val, e.target.checked)}
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={option.inputType || 'text'}
              maxLength={option.maxLength}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={previewSelections[id] || ''}
              onChange={(e) => setPreviewSelections({ ...previewSelections, [id]: e.target.value })}
              required={option.required}
            />
          </div>
        );

      case 'longText':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              maxLength={option.maxLength}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={previewSelections[id] || ''}
              onChange={(e) => setPreviewSelections({ ...previewSelections, [id]: e.target.value })}
              required={option.required}
            />
          </div>
        );

      case 'fileUpload':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              className="w-full"
              onChange={(e) => handleFileUpload(id, e.target.files?.[0] || null)}
              required={option.required}
            />
            {previewFileNames[id] && (
              <p className="text-xs text-gray-500 mt-1">Uploaded: {previewFileNames[id]}</p>
            )}
          </div>
        );

      case 'colorSwatches':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-wrap gap-3">
              {option.values.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleColorSwatchSelect(id, item.label)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    previewSelections[id] === item.label ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: item.color }}
                  title={item.label}
                />
              ))}
            </div>
          </div>
        );

      case 'imageSwatches':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-wrap gap-3">
              {option.values.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleImageSwatchSelect(id, item.label)}
                  className={`border-2 rounded-md p-1 ${
                    previewSelections[id] === item.label ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'
                  }`}
                >
                  <img src={item.imageUrl} alt={item.label} className="w-12 h-12 object-cover" />
                  <span className="text-xs mt-1 block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'grid':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.title} {option.required && <span className="text-red-500">*</span>}
            </label>
            <table className="border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1 bg-gray-50">{option.yAxisTitle || ''}</th>
                  {option.xAxisKeys.map((key) => (
                    <th key={key} className="border border-gray-300 px-2 py-1 bg-gray-50">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {option.yAxisKeys.map((rowKey) => (
                  <tr key={rowKey}>
                    <td className="border border-gray-300 px-2 py-1 font-medium bg-gray-50">{rowKey}</td>
                    {option.xAxisKeys.map((colKey) => (
                      <td key={colKey} className="border border-gray-300 px-2 py-1 text-center">
                        <input
                          type="radio"
                          name={`${id}-${rowKey}`}
                          value={`${rowKey}:${colKey}`}
                          checked={previewSelections[id] === `${rowKey}:${colKey}`}
                          onChange={() => handleRadioChange(id, `${rowKey}:${colKey}`)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'instructions':
        return (
          <div key={id} className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <div dangerouslySetInnerHTML={{ __html: option.htmlContent }} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Top Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Duplicate</h3>
          <p className="text-gray-600 text-sm">Duplicate settings from one product to others</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Settings</h3>
          <p className="text-gray-600 text-sm">Change settings for how the app looks and functions</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Help</h3>
          <p className="text-gray-600 text-sm">Articles on how to use the app and fix common issues</p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Form Builder */}
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h2 className="text-xl font-bold mb-4">Virtual Options Builder</h2>
            <p className="text-sm text-gray-500 mb-4">
              Create custom product options. Your customers will see these on the product page.
            </p>

            {/* List of Existing Options */}
            <div className="space-y-3 mb-6">
              {options.map((option) => (
                <div key={option.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50">
                  <div>
                    <p className="font-medium">{option.title}</p>
                    <p className="text-xs text-gray-500 capitalize">Type: {option.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(option)}
                      className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteOption(option.id)}
                      className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={openAddModal}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
            >
              + ADD Virtual Options
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              How to add Virtual Options: Click the button and fill in the details.
            </p>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="space-y-2 border-t pt-4">
            {options.map((option) => renderPreview(option))}
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Options */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Option' : 'Add Virtual Option'}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newOption.title}
                    onChange={(e) => setNewOption({ ...newOption, title: e.target.value })}
                    placeholder="e.g., Color, Size, Material"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newOption.type}
                    onChange={(e) => setNewOption({ ...newOption, type: e.target.value })}
                  >
                    <option value="dropdown">Dropdown</option>
                    <option value="buttons">Buttons</option>
                    <option value="colorSwatches">Color Swatches</option>
                    <option value="imageSwatches">Image Swatches</option>
                    <option value="text">Text</option>
                    <option value="longText">Long Text</option>
                    <option value="fileUpload">File Upload</option>
                    <option value="radio">Radio Buttons</option>
                    <option value="checkboxes">Checkboxes</option>
                    <option value="grid">Grid</option>
                    <option value="instructions">Instructions</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newOption.required}
                    onChange={(e) => setNewOption({ ...newOption, required: e.target.checked })}
                  />
                  <label htmlFor="required" className="text-sm text-gray-700">Required field</label>
                </div>

                {/* Dynamic fields based on type */}
                {(newOption.type === 'dropdown' || newOption.type === 'buttons' || newOption.type === 'radio') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Values (comma separated)</label>
                      <textarea
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.values}
                        onChange={(e) => setNewOption({ ...newOption, values: e.target.value })}
                        placeholder="small, medium, large"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preselect this value</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.preselectValue}
                        onChange={(e) => setNewOption({ ...newOption, preselectValue: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                  </>
                )}

                {newOption.type === 'checkboxes' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Values (comma separated)</label>
                      <textarea
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.values}
                        onChange={(e) => setNewOption({ ...newOption, values: e.target.value })}
                        placeholder="small, medium, large"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preselect values (comma separated)</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.preselectValues}
                        onChange={(e) => setNewOption({ ...newOption, preselectValues: e.target.value })}
                        placeholder="small, large"
                      />
                    </div>
                  </>
                )}

                {newOption.type === 'text' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum length</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.maxLength}
                        onChange={(e) => setNewOption({ ...newOption, maxLength: e.target.value })}
                        placeholder="e.g., 100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Input type</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.inputType}
                        onChange={(e) => setNewOption({ ...newOption, inputType: e.target.value })}
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="tel">Tel</option>
                      </select>
                    </div>
                  </>
                )}

                {newOption.type === 'longText' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum length</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={newOption.maxLength}
                      onChange={(e) => setNewOption({ ...newOption, maxLength: e.target.value })}
                      placeholder="e.g., 500"
                    />
                  </div>
                )}

                {newOption.type === 'colorSwatches' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color values (format: label:#hexcode, label2:#hexcode)</label>
                      <textarea
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.colorValues}
                        onChange={(e) => setNewOption({ ...newOption, colorValues: e.target.value })}
                        placeholder="Red:#ff0000, Green:#00ff00, Blue:#0000ff"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preselect this value</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.preselectValue}
                        onChange={(e) => setNewOption({ ...newOption, preselectValue: e.target.value })}
                        placeholder="Label of preselected color"
                      />
                    </div>
                  </>
                )}

                {newOption.type === 'imageSwatches' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image values (format: label:image_url, label2:image_url)</label>
                      <textarea
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.imageValues}
                        onChange={(e) => setNewOption({ ...newOption, imageValues: e.target.value })}
                        placeholder="Blue:https://example.com/blue.jpg, Red:https://example.com/red.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preselect this value</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.preselectValue}
                        onChange={(e) => setNewOption({ ...newOption, preselectValue: e.target.value })}
                        placeholder="Label of preselected image"
                      />
                    </div>
                  </>
                )}

                {newOption.type === 'grid' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Title</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.xAxisTitle}
                        onChange={(e) => setNewOption({ ...newOption, xAxisTitle: e.target.value })}
                        placeholder="e.g., Sizes"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Keys (comma separated)</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.xAxisKeys}
                        onChange={(e) => setNewOption({ ...newOption, xAxisKeys: e.target.value })}
                        placeholder="Small, Medium, Large"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Title</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.yAxisTitle}
                        onChange={(e) => setNewOption({ ...newOption, yAxisTitle: e.target.value })}
                        placeholder="e.g., Colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Keys (comma separated)</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={newOption.yAxisKeys}
                        onChange={(e) => setNewOption({ ...newOption, yAxisKeys: e.target.value })}
                        placeholder="Red, Blue, Green"
                      />
                    </div>
                  </>
                )}

                {newOption.type === 'instructions' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content (links and images allowed)</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                      value={newOption.htmlContent}
                      onChange={(e) => setNewOption({ ...newOption, htmlContent: e.target.value })}
                      placeholder='<a href="https://www.google.com">Click me</a><br/><img src="https://example.com/image.jpg"/>'
                    />
                    <p className="text-xs text-gray-500 mt-1">Script tags aren't allowed</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveOption}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualOptions;