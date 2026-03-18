"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TopTicker from "@/app/components/TopPicker/TopPicker";
import Navbar from "@/app/components/Navbar/Navbar3";
import Footer from "@/app/components/Footer/Footer";
import GoUp from "@/app/components/Buttons/GoUp";
import ChatButton from "@/app/components/Buttons/ChatButton";

const EMBROIDERY_FORMATS = ["DST", "PES", "EXP", "JEF", "HUS", "VIP", "VP3", "XXX", "PDF Production Sheet", "PNG Preview"];

const emptyForm = {
  title: "",
  price: "0",
  is_free: true,
  main_category_id: "",
  theme_id: "",
  sub_theme_id: "",
  description: "",
  formats: [],
  sizes: [{ hoop: "4x4", width_in: "", height_in: "", stitches: "" }],
  seo_title: "",
  url_slug: "",
  meta_description: "",
  tags: "",
  alt_text: "",
  main_preview_url: "",
  stitchout_url: "",
  mockup_url: "",
  internal_notes: "",
  status: "draft",
  technical_attributes: {},
};

function designToForm(d) {
  const sizes = (d.design_sizes || []).length
    ? d.design_sizes.map((s) => ({
        hoop: s.hoop != null ? String(s.hoop) : "",
        width_in: s.width_in != null ? String(s.width_in) : "",
        height_in: s.height_in != null ? String(s.height_in) : "",
        stitches: s.stitches != null ? String(s.stitches) : "",
      }))
    : [{ hoop: "4x4", width_in: "", height_in: "", stitches: "" }];
  const tags = Array.isArray(d.tags) ? d.tags.join(", ") : (d.tags || "");
  return {
    ...emptyForm,
    title: d.title || "",
    price: d.price != null ? String(d.price) : "0",
    is_free: Boolean(d.is_free),
    main_category_id: d.main_category_id != null ? String(d.main_category_id) : "",
    theme_id: d.theme_id != null ? String(d.theme_id) : "",
    sub_theme_id: d.sub_theme_id != null ? String(d.sub_theme_id) : "",
    description: d.description || "",
    formats: (() => {
      const fromFormats = Array.isArray(d.formats) ? d.formats : [];
      if (fromFormats.length > 0) return fromFormats;
      const fromAttr = d.technical_attributes?.file_format;
      return fromAttr ? (Array.isArray(fromAttr) ? fromAttr : [fromAttr]) : [];
    })(),
    sizes,
    seo_title: d.seo_title || "",
    url_slug: d.url_slug || "",
    meta_description: d.meta_description || "",
    tags,
    alt_text: d.alt_text || "",
    main_preview_url: d.main_preview_url || "",
    stitchout_url: d.stitchout_url || "",
    mockup_url: d.mockup_url || "",
    internal_notes: d.internal_notes || "",
    status: d.status === "published" ? "published" : "draft",
    technical_attributes: (() => {
      const raw = d.technical_attributes && typeof d.technical_attributes === "object" ? d.technical_attributes : {};
      const out = { ...raw };
      for (const key of ["placement", "hoop_size", "print_method"]) {
        if (out[key] !== undefined && !Array.isArray(out[key])) out[key] = out[key] ? [out[key]] : [];
      }
      if (out.works_with !== undefined && !Array.isArray(out.works_with)) out.works_with = out.works_with ? [out.works_with] : [];
      return out;
    })(),
  };
}

function AddDesignForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const submittingRef = useRef(false);
  const mainPreviewFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(!!editId);
  const [uploading, setUploading] = useState(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [subThemes, setSubThemes] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [form, setForm] = useState(emptyForm);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [themeModalType, setThemeModalType] = useState("theme");
  const [themeModalName, setThemeModalName] = useState("");
  const [themeModalParentId, setThemeModalParentId] = useState("");
  const [themeModalSaving, setThemeModalSaving] = useState(false);
  const [themeModalError, setThemeModalError] = useState("");

  const refetchThemes = () => {
    fetch("/api/themes")
      .then((r) => r.json())
      .then((data) => setThemes(Array.isArray(data) ? data : []))
      .catch(() => setThemes([]));
  };

  const refetchSubThemes = () => {
    if (!form.theme_id) {
      setSubThemes([]);
      return;
    }
    fetch(`/api/sub-themes?theme_id=${form.theme_id}`)
      .then((r) => r.json())
      .then((data) => setSubThemes(Array.isArray(data) ? data : []))
      .catch(() => setSubThemes([]));
  };

  useEffect(() => {
    if (!editId) return;
    setLoadingForm(true);
    setError("");
    fetch(`/api/designs/${editId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setForm(designToForm(data));
      })
      .catch((err) => setError(err.message || "Failed to load design"))
      .finally(() => setLoadingForm(false));
  }, [editId]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    fetch("/api/themes")
      .then((r) => r.json())
      .then((data) => setThemes(Array.isArray(data) ? data : []))
      .catch(() => setThemes([]));
  }, []);

  useEffect(() => {
    if (!form.theme_id) {
      setSubThemes([]);
      return;
    }
    fetch(`/api/sub-themes?theme_id=${form.theme_id}`)
      .then((r) => r.json())
      .then((data) => setSubThemes(Array.isArray(data) ? data : []))
      .catch(() => setSubThemes([]));
  }, [form.theme_id]);

  useEffect(() => {
    if (!form.main_category_id) {
      setFilterOptions({});
      return;
    }
    const slug = categories.find((c) => c.id === parseInt(form.main_category_id, 10))?.slug;
    if (!slug) return;
    fetch(`/api/filter-options?main_category=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(setFilterOptions)
      .catch(() => setFilterOptions({}));
  }, [form.main_category_id, categories]);

  const selectedCategorySlug = categories.find((c) => c.id === parseInt(form.main_category_id, 10))?.slug;
  const isEmbroidery = selectedCategorySlug === "embroidery";
  const isSvgCricut = selectedCategorySlug === "svg-cricut";
  const isLaserCnc = selectedCategorySlug === "laser-cnc";
  const isPrint = selectedCategorySlug === "print";
  const getWorksWithValues = () => {
    const w = form.technical_attributes?.works_with;
    return Array.isArray(w) ? w : w ? [w] : [];
  };
  const toggleWorksWith = (machine) => {
    setForm((prev) => {
      const current = prev.technical_attributes?.works_with;
      const arr = Array.isArray(current) ? [...current] : current ? [current] : [];
      const next = arr.includes(machine) ? arr.filter((m) => m !== machine) : [...arr, machine];
      return { ...prev, technical_attributes: { ...prev.technical_attributes, works_with: next } };
    });
  };

  useEffect(() => {
    if (!isSvgCricut) return;
    const cutType = form.technical_attributes?.svg_type;
    const worksWith = form.technical_attributes?.works_with;
    const arr = Array.isArray(worksWith) ? worksWith : worksWith ? [worksWith] : [];
    if (cutType === "Basic Cut" && arr.length === 0) {
      setForm((prev) => ({
        ...prev,
        technical_attributes: { ...prev.technical_attributes, works_with: ["Cricut", "Silhouette", "Glowforge", "Brother ScanNCut"] },
      }));
    }
  }, [isSvgCricut, form.technical_attributes?.svg_type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "is_free") setForm((prev) => ({ ...prev, is_free: value === "true" || value === "yes" }));
  };

  const toggleFormat = (code) => {
    setForm((prev) => ({
      ...prev,
      formats: prev.formats.includes(code) ? prev.formats.filter((f) => f !== code) : [...prev.formats, code],
    }));
  };

  const updateSize = (index, field, value) => {
    setForm((prev) => {
      const next = [...prev.sizes];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, sizes: next };
    });
  };

  const addSize = () => {
    setForm((prev) => ({ ...prev, sizes: [...prev.sizes, { hoop: "", width_in: "", height_in: "", stitches: "" }] }));
  };

  const removeSize = (index) => {
    setForm((prev) => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }));
  };

  const uploadFile = async (file, field) => {
    if (!file?.size) return null;
    setUploading(field);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const url = data.url;
      setForm((prev) => {
        if (field === "download_url") {
          return {
            ...prev,
            technical_attributes: {
              ...prev.technical_attributes,
              download_url: url,
            },
          };
        }
        return { ...prev, [field]: url };
      });
      if (field === "main_preview_url") mainPreviewFileRef.current = null;
      return url;
    } catch (err) {
      setError(err.message || "Upload failed");
      return null;
    } finally {
      setUploading(null);
    }
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === "main_preview_url") mainPreviewFileRef.current = file;
      uploadFile(file, field);
    }
  };

  const handleZipChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, "download_url");
    }
  };

  const setTechnical = (key, value) => {
    setForm((prev) => ({
      ...prev,
      technical_attributes: { ...prev.technical_attributes, [key]: value },
    }));
  };

  const setTechnicalMulti = (key, value) => {
    setForm((prev) => {
      const current = prev.technical_attributes[key];
      const arr = Array.isArray(current) ? [...current] : current ? [current] : [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return {
        ...prev,
        technical_attributes: { ...prev.technical_attributes, [key]: next },
      };
    });
  };

  const getTechnicalMultiValues = (key) => {
    const current = form.technical_attributes[key];
    return Array.isArray(current) ? current : current ? [current] : [];
  };

  const handleThemeModalSubmit = async (e) => {
    e.preventDefault();
    const name = themeModalName.trim();
    if (!name) {
      setThemeModalError("Name is required");
      return;
    }
    if (themeModalType === "subtheme" && !themeModalParentId) {
      setThemeModalError("Please select a parent theme");
      return;
    }
    setThemeModalSaving(true);
    setThemeModalError("");
    try {
      if (themeModalType === "theme") {
        const res = await fetch("/api/themes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create theme");
        refetchThemes();
        setForm((prev) => ({ ...prev, theme_id: String(data.theme.id), sub_theme_id: "" }));
        setSubThemes([]);
        setThemeModalOpen(false);
        setThemeModalName("");
      } else {
        const res = await fetch("/api/sub-themes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme_id: themeModalParentId, name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create sub-theme");
        setForm((prev) => ({ ...prev, theme_id: themeModalParentId, sub_theme_id: String(data.sub_theme.id) }));
        refetchThemes();
        const subRes = await fetch(`/api/sub-themes?theme_id=${themeModalParentId}`);
        const subData = await subRes.json();
        setSubThemes(Array.isArray(subData) ? subData : []);
        setThemeModalOpen(false);
        setThemeModalName("");
        setThemeModalParentId("");
      }
    } catch (err) {
      setThemeModalError(err.message || "Something went wrong");
    } finally {
      setThemeModalSaving(false);
    }
  };

  const submitWithStatus = async (status) => {
    if (submittingRef.current || loading) return;
    setError("");

    let mainPreviewUrl = form.main_preview_url?.trim() || null;
    if (status === "published") {
      if (uploading === "main_preview_url") {
        setError("Please wait for the main preview image to finish uploading.");
        return;
      }
      if (!mainPreviewUrl && mainPreviewFileRef.current) {
        const url = await uploadFile(mainPreviewFileRef.current, "main_preview_url");
        if (url) mainPreviewUrl = url;
        else {
          return;
        }
      }
      if (!mainPreviewUrl) {
        setError("Please upload at least the Main preview image before publishing.");
        return;
      }
    }

    submittingRef.current = true;
    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        price: parseFloat(form.price) || 0,
        is_free: form.is_free === true || form.is_free === "true" || form.is_free === "yes",
        main_category_id: parseInt(form.main_category_id, 10),
        theme_id: form.theme_id ? parseInt(form.theme_id, 10) : null,
        sub_theme_id: form.sub_theme_id ? parseInt(form.sub_theme_id, 10) : null,
        main_preview_url: mainPreviewUrl || form.main_preview_url || null,
        stitchout_url: form.stitchout_url || null,
        mockup_url: form.mockup_url || null,
        seo_title: form.seo_title.trim() || null,
        meta_description: form.meta_description.trim() || null,
        url_slug: form.url_slug.trim() || null,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        alt_text: form.alt_text.trim() || null,
        internal_notes: form.internal_notes.trim() || null,
        status,
        is_featured: false,
        is_new_arrival: false,
        is_bundle: false,
        technical_attributes: form.technical_attributes,
        formats: form.formats,
        sizes: form.sizes.map((s) => ({
          hoop: s.hoop || null,
          width_in: s.width_in ? parseFloat(s.width_in) : null,
          height_in: s.height_in ? parseFloat(s.height_in) : null,
          stitches: s.stitches ? parseInt(s.stitches, 10) : null,
        })),
      };
      const url = editId ? `/api/designs/${editId}` : "/api/designs";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (editId ? "Failed to update design" : "Failed to create design"));
      router.push(`/design/${data.design?.slug || data.design?.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (submittingRef.current || loading) return;
  };

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {editId ? "Edit Design" : "Upload New Design"}
            </h1>
            <Link
              href={editId ? "/design/manage" : "/design"}
              className="text-lv-red font-semibold hover:underline"
            >
              ← Back to {editId ? "Manage designs" : "Design Library"}
            </Link>
          </div>
          <p className="text-gray-600 mb-6">
            {editId ? "Update the design details below." : "Choose formats, add sizes, fill SEO once. This becomes your product page data."}
          </p>

          {loadingForm && <p className="text-gray-500 mb-4">Loading design…</p>}
          <form onSubmit={handleFormSubmit} className="space-y-8">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Product Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Vintage Semi Truck Embroidery Design"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="3.99"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Free?</label>
                    <select
                      name="is_free"
                      value={form.is_free === true || form.is_free === "true" ? "yes" : "no"}
                      onChange={(e) => setForm((prev) => ({ ...prev, is_free: e.target.value === "yes" }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Production Type *</label>
                  <select
                    name="main_category_id"
                    required
                    value={form.main_category_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <label className="block text-sm font-semibold text-gray-800">Main Theme</label>
                    <button
                      type="button"
                      onClick={() => {
                        setThemeModalOpen(true);
                        setThemeModalType("theme");
                        setThemeModalName("");
                        setThemeModalParentId("");
                        setThemeModalError("");
                      }}
                      className="text-xs text-lv-red hover:underline font-medium"
                    >
                      Add theme or sub-theme
                    </button>
                  </div>
                  <select
                    name="theme_id"
                    value={form.theme_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  >
                    <option value="">Select theme</option>
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                {subThemes.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Sub Theme</label>
                    <select
                      name="sub_theme_id"
                      value={form.sub_theme_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    >
                      <option value="">Select sub theme</option>
                      {subThemes.map((st) => (
                        <option key={st.id} value={st.id}>{st.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write a short helpful description."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red resize-y"
                  />
                </div>

                {isEmbroidery && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Formats included</label>
                      <div className="flex flex-wrap gap-2">
                        {EMBROIDERY_FORMATS.map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => toggleFormat(code)}
                            className={`px-3 py-1.5 rounded-lg text-sm border ${
                              form.formats.includes(code) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600"
                            }`}
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-gray-800">Sizes included</label>
                        <button type="button" onClick={addSize} className="text-sm text-lv-red hover:underline">Add size</button>
                      </div>
                      <div className="space-y-2">
                        {form.sizes.map((s, i) => (
                          <div key={i} className="grid grid-cols-12 gap-2 items-center">
                            <input
                              placeholder="Hoop"
                              value={s.hoop}
                              onChange={(e) => updateSize(i, "hoop", e.target.value)}
                              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <input
                              placeholder="Width (in)"
                              type="number"
                              step="0.01"
                              value={s.width_in}
                              onChange={(e) => updateSize(i, "width_in", e.target.value)}
                              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <input
                              placeholder="Height (in)"
                              type="number"
                              step="0.01"
                              value={s.height_in}
                              onChange={(e) => updateSize(i, "height_in", e.target.value)}
                              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <input
                              placeholder="Stitches"
                              type="number"
                              value={s.stitches}
                              onChange={(e) => updateSize(i, "stitches", e.target.value)}
                              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <button type="button" onClick={() => removeSize(i)} className="col-span-2 text-sm text-red-600 hover:underline">Remove</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">License</label>
                      <select
                        value={form.technical_attributes?.license || ""}
                        onChange={(e) => setForm((prev) => ({
                          ...prev,
                          technical_attributes: { ...prev.technical_attributes, license: e.target.value },
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                      >
                        <option value="">Select</option>
                        <option value="Personal Use Only">Personal Use Only</option>
                        <option value="Personal and Commercial Use">Personal and Commercial Use</option>
                        <option value="Commercial Use">Commercial Use</option>
                      </select>
                    </div>
                  </>
                )}

                {isSvgCricut && (filterOptions.file_format?.length > 0) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Formats included</label>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.file_format.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleFormat(opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm border ${
                            form.formats.includes(opt.value) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {opt.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {isSvgCricut && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Works with</label>
                      <div className="flex flex-wrap gap-2">
                        {["Cricut", "Silhouette", "Glowforge", "Brother ScanNCut"].map((machine) => (
                          <button
                            key={machine}
                            type="button"
                            onClick={() => toggleWorksWith(machine)}
                            className={`px-3 py-1.5 rounded-lg text-sm border ${
                              getWorksWithValues().includes(machine) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600 hover:border-gray-400"
                            }`}
                          >
                            {machine}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">License</label>
                      <select
                        value={form.technical_attributes?.license || ""}
                        onChange={(e) => setForm((prev) => ({
                          ...prev,
                          technical_attributes: { ...prev.technical_attributes, license: e.target.value },
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                      >
                        <option value="">Select</option>
                        <option value="Personal Use Only">Personal Use Only</option>
                        <option value="Commercial Use">Commercial Use</option>
                      </select>
                    </div>
                  </>
                )}
                {isLaserCnc && (filterOptions.file_format?.length > 0) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Formats included</label>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.file_format.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleFormat(opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm border ${
                            form.formats.includes(opt.value) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {opt.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {isLaserCnc && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">Best Use</label>
                      <input
                        type="text"
                        value={form.technical_attributes?.best_use || ""}
                        onChange={(e) => setForm((prev) => ({
                          ...prev,
                          technical_attributes: { ...prev.technical_attributes, best_use: e.target.value },
                        }))}
                        placeholder="e.g. Wood, acrylic, engraved decor, signs"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">License</label>
                      <select
                        value={form.technical_attributes?.license || ""}
                        onChange={(e) => setForm((prev) => ({
                          ...prev,
                          technical_attributes: { ...prev.technical_attributes, license: e.target.value },
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                      >
                        <option value="">Select</option>
                        <option value="Personal Use Only">Personal Use Only</option>
                        <option value="Commercial Use">Commercial Use</option>
                      </select>
                    </div>
                  </>
                )}
                {isPrint && (filterOptions.file_format?.length > 0) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Formats included</label>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.file_format.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleFormat(opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm border ${
                            form.formats.includes(opt.value) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {opt.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {isPrint && (filterOptions.print_method?.length > 0) && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Print method</label>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.print_method.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTechnicalMulti("print_method", opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm border ${
                            getTechnicalMultiValues("print_method").includes(opt.value) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {opt.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {isPrint && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">License</label>
                    <select
                      value={form.technical_attributes?.license || ""}
                      onChange={(e) => setForm((prev) => ({
                        ...prev,
                        technical_attributes: { ...prev.technical_attributes, license: e.target.value },
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    >
                      <option value="">Select</option>
                      <option value="Personal Use Only">Personal Use Only</option>
                      <option value="Commercial Use">Commercial Use</option>
                    </select>
                  </div>
                )}
                {Object.entries(filterOptions).map(([key, options]) => {
                  if (isSvgCricut && (key === "design_style" || key === "file_format")) return null;
                  if (isLaserCnc && key === "file_format") return null;
                  if (isPrint && (key === "file_format" || key === "print_method")) return null;
                  const isMulti = isEmbroidery && (key === "placement" || key === "hoop_size");
                  if (isMulti) {
                    const selected = getTechnicalMultiValues(key);
                    return (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-gray-800 mb-2 capitalize">{key.replace(/_/g, " ")}</label>
                        <div className="flex flex-wrap gap-2">
                          {options.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setTechnicalMulti(key, opt.value)}
                              className={`px-3 py-1.5 rounded-lg text-sm border ${
                                selected.includes(opt.value) ? "border-lv-red bg-lv-red-pale text-lv-red" : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                            >
                              {opt.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-800 mb-1 capitalize">{key.replace(/_/g, " ")}</label>
                      <select
                        value={Array.isArray(form.technical_attributes[key]) ? form.technical_attributes[key][0] || "" : (form.technical_attributes[key] || "")}
                        onChange={(e) => setTechnical(key, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                      >
                        <option value="">Select</option>
                        {options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.value}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800">SEO and Media</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">SEO Title</label>
                  <input
                    type="text"
                    name="seo_title"
                    value={form.seo_title}
                    onChange={handleChange}
                    placeholder="Vintage Semi Truck Embroidery Design Free Download"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="url_slug"
                    value={form.url_slug}
                    onChange={handleChange}
                    placeholder="vintage-semi-truck-embroidery"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Meta Description</label>
                  <textarea
                    name="meta_description"
                    rows={2}
                    value={form.meta_description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="truck, semi, embroidery"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">ALT Text (image)</label>
                  <input
                    type="text"
                    name="alt_text"
                    value={form.alt_text}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Main preview</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "main_preview_url")}
                    disabled={!!uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100"
                  />
                  {uploading === "main_preview_url" && <span className="text-sm text-gray-500">Uploading…</span>}
                  {form.main_preview_url && <p className="text-sm text-green-600 mt-1">Uploaded</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Stitchout</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "stitchout_url")}
                    disabled={!!uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100"
                  />
                  {uploading === "stitchout_url" && <span className="text-sm text-gray-500">Uploading…</span>}
                  {form.stitchout_url && <p className="text-sm text-green-600 mt-1">Uploaded</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Mockup</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "mockup_url")}
                    disabled={!!uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100"
                  />
                  {uploading === "mockup_url" && <span className="text-sm text-gray-500">Uploading…</span>}
                  {form.mockup_url && <p className="text-sm text-green-600 mt-1">Uploaded</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Download ZIP (customer file)</label>
                  <input
                    type="file"
                    accept=".zip,.rar,.7z,.tar,.gz,.bz2,application/zip,application/x-zip-compressed"
                    onChange={handleZipChange}
                    disabled={!!uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100"
                  />
                  {uploading === "download_url" && <span className="text-sm text-gray-500">Uploading…</span>}
                  {form.technical_attributes?.download_url && (
                    <p className="text-sm text-green-600 mt-1">ZIP uploaded</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Internal notes</label>
                  <textarea
                    name="internal_notes"
                    rows={3}
                    value={form.internal_notes}
                    onChange={handleChange}
                    placeholder="Anything for yourself."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red resize-y"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => submitWithStatus("draft")}
                disabled={loading || loadingForm}
                className="px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-gray-400 disabled:opacity-60"
              >
                {loading ? "Saving…" : editId ? "Save as draft" : "Save draft"}
              </button>
              <button
                type="button"
                onClick={() => submitWithStatus("published")}
                disabled={loading || loadingForm}
                className="px-6 py-3 bg-lv-red hover:bg-lv-red-dark text-white font-semibold rounded-lg disabled:opacity-60"
              >
                {loading ? "Saving…" : editId ? "Update & publish" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {themeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add theme or sub-theme</h3>
            <form onSubmit={handleThemeModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="themeModalType"
                      checked={themeModalType === "theme"}
                      onChange={() => setThemeModalType("theme")}
                      className="text-lv-red focus:ring-lv-red"
                    />
                    <span>Theme</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="themeModalType"
                      checked={themeModalType === "subtheme"}
                      onChange={() => setThemeModalType("subtheme")}
                      className="text-lv-red focus:ring-lv-red"
                    />
                    <span>Sub-theme</span>
                  </label>
                </div>
              </div>
              {themeModalType === "subtheme" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent theme</label>
                  <select
                    value={themeModalParentId}
                    onChange={(e) => setThemeModalParentId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                    required={themeModalType === "subtheme"}
                  >
                    <option value="">Select theme</option>
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={themeModalName}
                  onChange={(e) => setThemeModalName(e.target.value)}
                  placeholder={themeModalType === "theme" ? "e.g. Animals" : "e.g. Dogs"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-red"
                  required
                />
              </div>
              {themeModalError && (
                <p className="text-sm text-red-600">{themeModalError}</p>
              )}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setThemeModalOpen(false);
                    setThemeModalError("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={themeModalSaving}
                  className="flex-1 px-4 py-2 bg-lv-red text-white rounded-lg hover:bg-lv-red-dark disabled:opacity-60"
                >
                  {themeModalSaving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

function AddDesignPageFallback() {
  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Upload New Design</h1>
            <Link href="/design" className="text-lv-red font-semibold hover:underline">← Back to Design Library</Link>
          </div>
          <p className="text-gray-500">Loading…</p>
        </div>
      </section>
      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}

export default function AddDesignPage() {
  return (
    <Suspense fallback={<AddDesignPageFallback />}>
      <AddDesignForm />
    </Suspense>
  );
}
