import React, { useEffect, useState } from 'react';
import {
    Page,
    Layout,
    Card,
    Text,
    Link,
    Button,
    Box,
    Grid,
    Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

// Helper to generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Demo: Shopify Options (read-only, from Shopify)
const shopifyOptions = [
    { id: 'shopify-size', title: 'Size', type: 'dropdown', required: false, values: ['One Size', 'Small', 'Medium', 'Large'] },
    { id: 'shopify-color', title: 'Color', type: 'dropdown', required: false, values: ['Default', 'Red', 'Blue', 'Green'] },
];

// Initial Virtual Options (user created)
const initialVirtualOptions = [
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
    const [virtualOptions, setVirtualOptions] = useState(initialVirtualOptions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Preview state for user selections (what customer selects)
    const [selections, setSelections] = useState({});
    const [checkboxSelections, setCheckboxSelections] = useState({});
    const [fileNames, setFileNames] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState(null);

    const [searchParams] = useSearchParams();
    const productId = searchParams.get("productId");

    // Load virtual options for this product
    useEffect(() => {
        if (!productId) {
            setIsLoading(false);
            return;
        }
        const fetchOptions = async () => {
            try {
                const res = await fetch(`/api/virtual-options/${productId}`);
                const data = await res.json();
                if (data.success && data.options && data.options.length) {
                    setVirtualOptions(data.options);
                } else {
                    setVirtualOptions([]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOptions();
    }, [productId]);

    // Form state for new/edit option
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
        // Populate based on type
        if (option.type === 'dropdown' || option.type === 'buttons' || option.type === 'radio') {
            setNewOption({
                title: option.title,
                type: option.type,
                required: option.required,
                preselectValue: option.preselectValue || '',
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
                preselectValues: (option.preselectValues || []).join(', '),
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
                preselectValue: option.preselectValue || '',
                // colorValues: option.values.map(v => `${v.label}:${v.color}`).join(', '),
                colorValues: option.colorValues.map(v => `${v.label}:${v.color}`).join(', '),
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
                preselectValue: option.preselectValue || '',
                // imageValues: option.values.map(v => `${v.label}:${v.imageUrl}`).join(', '),
                imageValues: option.imageValues.map(v => `${v.label}:${v.imageUrl}`).join(', '),
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
                colorValues: colorItems,
                // values: colorItems,
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
                imageValues: imageItems,
                // values: imageItems,
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
            setVirtualOptions(virtualOptions.map(opt => (opt.id === editingId ? savedOption : opt)));
        } else {
            setVirtualOptions([...virtualOptions, savedOption]);
        }

        // ✅ Backend save call yahan add karo
        saveToBackendWithOptions(editingId
            ? virtualOptions.map(opt => (opt.id === editingId ? savedOption : opt))
            : [...virtualOptions, savedOption]
        );

        setIsModalOpen(false);
    };

    const saveToBackendWithOptions = async (optionsToSave) => {
        if (!productId) return;
        setSaveStatus('saving');
        try {
            const res = await fetch(`/api/virtual-options/${productId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ options: optionsToSave })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Options Saved Successfully!")
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus(null), 2000);
            } else {
                toast.error("Failed to Save Options.")
                setSaveStatus('error');
            }
        } catch (err) {
            toast.error("An error occurred while saving options.")
            setSaveStatus('error');
        }
    };

    // Save to backend
    // const saveToBackend = async () => {
    //     if (!productId) return;
    //     setSaveStatus('saving');
    //     try {
    //         const res = await fetch(`/api/virtual-options/${productId}`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ options: virtualOptions })
    //         });
    //         const data = await res.json();
    //         if (data.success) {
    //             setSaveStatus('saved');
    //             setTimeout(() => setSaveStatus(null), 2000);
    //         } else {
    //             setSaveStatus('error');
    //         }
    //     } catch (err) {
    //         setSaveStatus('error');
    //     }
    // };

    // Delete option
    const deleteOption = async (id) => {
        if (!productId) return;

        try {
            const res = await fetch(`/api/virtual-options/${productId}/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Option Deleted Successfully!");
                setVirtualOptions(data.options);
                // Clean up selection states
                const newSelections = { ...selections };
                delete newSelections[id];
                setSelections(newSelections);
                const newCheckboxSelections = { ...checkboxSelections };
                delete newCheckboxSelections[id];
                setCheckboxSelections(newCheckboxSelections);

            }
        } catch (err) {
            toast.error("An error occurred while deleting the option.");
            console.error(err);
        }
    };

    // const deleteOption = (id) => {
    //     setVirtualOptions(virtualOptions.filter(opt => opt.id !== id));
    //     // Clean up selection states
    //     const newSelections = { ...selections };
    //     delete newSelections[id];
    //     setSelections(newSelections);
    //     const newCheckboxSelections = { ...checkboxSelections };
    //     delete newCheckboxSelections[id];
    //     setCheckboxSelections(newCheckboxSelections);
    // };

    // Handlers for customer selections
    const handleDropdownChange = (id, value) => setSelections({ ...selections, [id]: value });
    const handleRadioChange = (id, value) => setSelections({ ...selections, [id]: value });
    const handleButtonSelect = (id, value) => setSelections({ ...selections, [id]: value });
    const handleColorSwatchSelect = (id, value) => setSelections({ ...selections, [id]: value });
    const handleImageSwatchSelect = (id, value) => setSelections({ ...selections, [id]: value });
    const handleCheckboxToggle = (id, value, checked) => {
        const current = checkboxSelections[id] || [];
        const updated = checked ? [...current, value] : current.filter(v => v !== value);
        setCheckboxSelections({ ...checkboxSelections, [id]: updated });
    };
    const handleFileUpload = (id, file) => {
        if (file) setFileNames({ ...fileNames, [id]: file.name });
        else {
            const newNames = { ...fileNames };
            delete newNames[id];
            setFileNames(newNames);
        }
    };

    // Render a single option control (for shopify or virtual)
    const renderOptionControl = (option, isShopify = false) => {
        const id = option.id;
        const value = selections[id] || '';
        const checkboxVals = checkboxSelections[id] || [];

        switch (option.type) {
            case 'dropdown':
                return (
                    <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        value={value}
                        onChange={(e) => handleDropdownChange(id, e.target.value)}
                        required={option.required}
                    >
                        <option value="">Choose one</option>
                        {option.values.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                );
            case 'buttons':
                return (
                    <div className="flex flex-wrap gap-2">
                        {option.values.map(v => (
                            <button
                                key={v}
                                type="button"
                                onClick={() => handleButtonSelect(id, v)}
                                className={`px-3 py-1 text-sm border rounded-md transition ${selections[id] === v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                );
            case 'radio':
                return (
                    <div className="space-y-1">
                        {option.values.map(v => (
                            <label key={v} className="flex items-center gap-2 text-sm">
                                <input type="radio" name={id} value={v} checked={selections[id] === v} onChange={() => handleRadioChange(id, v)} />
                                <span>{v}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'checkboxes':
                return (
                    <div className="space-y-1">
                        {option.values.map(v => (
                            <label key={v} className="flex items-center gap-2 text-sm">
                                <input type="checkbox" value={v} checked={checkboxVals.includes(v)} onChange={(e) => handleCheckboxToggle(id, v, e.target.checked)} />
                                <span>{v}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'text':
                return (
                    <input
                        type={option.inputType || 'text'}
                        maxLength={option.maxLength}
                        className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={value}
                        onChange={(e) => handleDropdownChange(id, e.target.value)}
                    />
                );
            case 'longText':
                return (
                    <textarea
                        rows={3}
                        maxLength={option.maxLength}
                        className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={value}
                        onChange={(e) => handleDropdownChange(id, e.target.value)}
                    />
                );
            case 'fileUpload':
                return (
                    <div>
                        <input type="file" onChange={(e) => handleFileUpload(id, e.target.files?.[0] || null)} />
                        {fileNames[id] && <p className="text-xs text-gray-500 mt-1">Uploaded: {fileNames[id]}</p>}
                    </div>
                );
            case 'colorSwatches':
                return (
                    <div className="flex flex-wrap gap-3">
                        {option.colorValues.map(item => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleColorSwatchSelect(id, item.label)}
                                className={`w-8 h-8 rounded-full border-2 ${selections[id] === item.label ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'}`}
                                style={{ backgroundColor: item.color }}
                                title={item.label}
                            />
                        ))}
                    </div>
                );
            case 'imageSwatches':
                return (
                    <div className="flex flex-wrap gap-3">
                        {option.imageValues.map(item => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleImageSwatchSelect(id, item.label)}
                                className={`border-2 rounded-md p-1 ${selections[id] === item.label ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'}`}
                            >
                                <img src={item.imageUrl} alt={item.label} className="w-10 h-10 object-cover" />
                                <span className="text-xs block">{item.label}</span>
                            </button>
                        ))}
                    </div>
                );
            case 'grid':
                return (
                    <table className="border-collapse border border-gray-300 text-sm">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-2 py-1 bg-gray-50">{option.yAxisTitle || ''}</th>
                                {option.xAxisKeys.map(key => <th key={key} className="border border-gray-300 px-2 py-1 bg-gray-50">{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {option.yAxisKeys.map(rowKey => (
                                <tr key={rowKey}>
                                    <td className="border border-gray-300 px-2 py-1 font-medium bg-gray-50">{rowKey}</td>
                                    {option.xAxisKeys.map(colKey => (
                                        <td key={colKey} className="border border-gray-300 px-2 py-1 text-center">
                                            <input
                                                type="radio"
                                                name={`${id}-${rowKey}`}
                                                value={`${rowKey}:${colKey}`}
                                                checked={selections[id] === `${rowKey}:${colKey}`}
                                                onChange={() => handleRadioChange(id, `${rowKey}:${colKey}`)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                );
            case 'instructions':
                return <div className="p-3 bg-gray-50 rounded-md text-sm" dangerouslySetInnerHTML={{ __html: option.htmlContent }} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    {/* <h1 className="text-2xl font-bold text-gray-800">VO Product Options</h1> */}
                    <p className="text-sm text-gray-500">Home / bracelet box</p>
                </div>

                {/* Action Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:shadow-md transition">
                        <h3 className="font-semibold text-gray-800">Duplicate</h3>
                        <p className="text-sm text-gray-500">Duplicate settings from one product to others</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:shadow-md transition">
                        <h3 className="font-semibold text-gray-800">Settings</h3>
                        <p className="text-sm text-gray-500">Change settings for how the app looks and functions</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:shadow-md transition">
                        <h3 className="font-semibold text-gray-800">Help</h3>
                        <p className="text-sm text-gray-500">Articles on how to use the app and fix common issues</p>
                    </div>
                </div> */}

                {/* Action Cards */}
                <Layout.Section>
                    <Grid>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            <Card>
                                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                                    <Box style={{ width: "68px", height: "68px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff", color: "#1d4ed8", fontSize: "32px", boxShadow: "inset 0 0 0 1px rgba(29, 78, 216, 0.1)" }}>
                                        📋
                                    </Box>
                                    <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#111827" }}>
                                        Duplicate
                                    </Text>
                                    <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.6", maxWidth: "220px" }}>
                                        Duplicate settings from one product to others efficiently
                                    </Text>
                                </Box>
                            </Card>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            <Card>
                                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                                    <Box style={{ width: "68px", height: "68px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f3ff", color: "#4338ca", fontSize: "32px", boxShadow: "inset 0 0 0 1px rgba(67, 56, 202, 0.1)" }}>
                                        ⚙️
                                    </Box>
                                    <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#111827" }}>
                                        Settings
                                    </Text>
                                    <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.6", maxWidth: "220px" }}>
                                        Change settings for how the app looks and functions
                                    </Text>
                                </Box>
                            </Card>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            <Card>
                                <Box padding="8" style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                                    <Box style={{ width: "68px", height: "68px", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fdf2f8", color: "#db2777", fontSize: "32px", boxShadow: "inset 0 0 0 1px rgba(219, 39, 119, 0.1)" }}>
                                        ❓
                                    </Box>
                                    <Text as="h3" variant="headingMd" style={{ marginBottom: "0", fontWeight: "700", color: "#111827" }}>
                                        Help
                                    </Text>
                                    <Text variant="bodySm" tone="subdued" style={{ lineHeight: "1.6", maxWidth: "220px" }}>
                                        Articles on how to use the app and fix common issues
                                    </Text>
                                </Box>
                            </Card>
                        </Grid.Cell>
                    </Grid>
                </Layout.Section>

                {/* Shopify Options Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Shopify Options</h2>
                            <a href="#" className="text-xs text-blue-600 hover:underline">How to style Shopify Options</a>
                        </div>
                    </div>
                    <div className="p-5 space-y-4">
                        {shopifyOptions.map(option => (
                            <div key={option.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <label className="w-24 text-sm font-medium text-gray-700">{option.title}:</label>
                                {renderOptionControl(option, true)}
                            </div>
                        ))}
                        <div className="pt-2">
                            <a href="#" className="text-sm text-blue-600 hover:underline">Edit Shopify Options in Shopify</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    {/* Virtual Options Section - Left Side */}
                    <div className="lg:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Virtual Options</h2>
                            <p className="text-xs text-gray-500">Manage your custom options</p>
                        </div>
                        <div className="p-5 space-y-5">
                            {virtualOptions.map(option => (
                                <div key={option.id} className="border-b border-gray-100 pb-4 last:border-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                        {/* Title and required badge */}
                                        <div className="sm:w-32 flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">{option.title}</span>
                                            {option.required && <span className="text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded whitespace-nowrap">required</span>}
                                        </div>

                                        {/* Input field row */}
                                        <div className="flex-1">
                                            {renderOptionControl(option, false)}
                                        </div>

                                        {/* Edit/Delete icons row */}
                                        <div className="flex gap-2 items-center">
                                            <button
                                                onClick={() => openEditModal(option)}
                                                className="cursor-pointer text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition"
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => deleteOption(option.id)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition cursor-pointer"
                                                title="Delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={openAddModal}
                                className="w-full mt-2 bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded-md hover:bg-blue-100 transition font-medium text-sm cursor-pointer"
                            >
                                + ADD Virtual Options
                            </button>
                            <p className="text-xs text-gray-400 text-center pt-1">
                                How to add Virtual Options: Click the button and fill in the details.
                            </p>
                        </div>
                    </div>

                    {/* Virtual Options Preview Section - Right Side */}
                    {virtualOptions.length > 0 && (
                        <div className="lg:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-5 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
                                <p className="text-xs text-gray-500">Live preview of your virtual options</p>
                            </div>
                            <div className="p-5 space-y-4">
                                {virtualOptions.map(option => (
                                    <div key={`preview-${option.id}`} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <label className="w-32 text-sm font-medium text-gray-700">
                                            {option.title}:
                                            {option.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        {renderOptionControl(option, false)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Add/Edit Virtual Option */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Virtual Option' : 'Add Virtual Option'}</h3>
                            <div className="space-y-4">
                                {/* Form fields same as before - keeping it concise but complete */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.title} onChange={(e) => setNewOption({ ...newOption, title: e.target.value })} placeholder="e.g., Color, Size, Material" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.type} onChange={(e) => setNewOption({ ...newOption, type: e.target.value })}>
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
                                    <input type="checkbox" id="required" checked={newOption.required} onChange={(e) => setNewOption({ ...newOption, required: e.target.checked })} />
                                    <label htmlFor="required" className="text-sm text-gray-700">Required field</label>
                                </div>

                                {/* Dynamic fields - same as original */}
                                {(newOption.type === 'dropdown' || newOption.type === 'buttons' || newOption.type === 'radio') && (
                                    <>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Values (comma separated)</label><textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.values} onChange={(e) => setNewOption({ ...newOption, values: e.target.value })} placeholder="small, medium, large" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Preselect this value</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.preselectValue} onChange={(e) => setNewOption({ ...newOption, preselectValue: e.target.value })} placeholder="Optional" /></div>
                                    </>
                                )}
                                {newOption.type === 'checkboxes' && (
                                    <>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Values (comma separated)</label><textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.values} onChange={(e) => setNewOption({ ...newOption, values: e.target.value })} placeholder="small, medium, large" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Preselect values (comma separated)</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.preselectValues} onChange={(e) => setNewOption({ ...newOption, preselectValues: e.target.value })} placeholder="small, large" /></div>
                                    </>
                                )}
                                {newOption.type === 'text' && (
                                    <>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Maximum length</label><input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.maxLength} onChange={(e) => setNewOption({ ...newOption, maxLength: e.target.value })} placeholder="e.g., 100" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Input type</label><select className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.inputType} onChange={(e) => setNewOption({ ...newOption, inputType: e.target.value })}><option value="text">Text</option><option value="number">Number</option><option value="email">Email</option><option value="tel">Tel</option></select></div>
                                    </>
                                )}
                                {newOption.type === 'longText' && (
                                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Maximum length</label><input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.maxLength} onChange={(e) => setNewOption({ ...newOption, maxLength: e.target.value })} placeholder="e.g., 500" /></div>
                                )}
                                {newOption.type === 'colorSwatches' && (
                                    <>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Color values (format: label:#hexcode)</label><textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.colorValues} onChange={(e) => setNewOption({ ...newOption, colorValues: e.target.value })} placeholder="Red:#ff0000, Green:#00ff00, Blue:#0000ff" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Preselect this value</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.preselectValue} onChange={(e) => setNewOption({ ...newOption, preselectValue: e.target.value })} placeholder="Label of preselected color" /></div>
                                    </>
                                )}
                                {newOption.type === 'imageSwatches' && (
                                    <>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Image values (label:url)</label><textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.imageValues} onChange={(e) => setNewOption({ ...newOption, imageValues: e.target.value })} placeholder="Blue:https://example.com/blue.jpg, Red:https://example.com/red.jpg" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Preselect this value</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.preselectValue} onChange={(e) => setNewOption({ ...newOption, preselectValue: e.target.value })} placeholder="Label" /></div>
                                    </>
                                )}
                                {newOption.type === 'grid' && (
                                    <>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Title</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.xAxisTitle} onChange={(e) => setNewOption({ ...newOption, xAxisTitle: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Keys (comma)</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.xAxisKeys} onChange={(e) => setNewOption({ ...newOption, xAxisKeys: e.target.value })} placeholder="Small, Medium, Large" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Title</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.yAxisTitle} onChange={(e) => setNewOption({ ...newOption, yAxisTitle: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Keys (comma)</label><input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" value={newOption.yAxisKeys} onChange={(e) => setNewOption({ ...newOption, yAxisKeys: e.target.value })} placeholder="Red, Blue, Green" /></div>
                                    </>
                                )}
                                {newOption.type === 'instructions' && (
                                    <div><label className="block text-sm font-medium text-gray-700 mb-1">HTML Content</label><textarea rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm" value={newOption.htmlContent} onChange={(e) => setNewOption({ ...newOption, htmlContent: e.target.value })} placeholder='<a href="https://www.google.com">Click me</a>' /><p className="text-xs text-gray-500 mt-1">Script tags aren't allowed</p></div>
                                )}
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button onClick={saveOption} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VirtualOptions;