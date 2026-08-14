import {
    useEffect,
    useState,
} from "react";

import Modal from "../Common/Modal";

import {
    createCourse,
    updateCourse,
    getCourseById,
} from "../../api/courseApi";

import {
    useToast,
} from "../../context/ToastContext";

const initialForm = {
    title: "",
    instructorName: "",
    category: "",
    duration: "",
    description: "",
    status: "Active",
};

const CourseModal = ({
    isOpen,
    onClose,
    courseId,
    refreshCourses,
}) => {

    const { showToast } =
        useToast();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState(initialForm);

    useEffect(() => {

        if (
            isOpen &&
            courseId
        ) {
            loadCourse();
        }

        if (
            isOpen &&
            !courseId
        ) {
            setForm(initialForm);
        }

    }, [isOpen, courseId]);

    const loadCourse =
        async () => {
            try {

                const res =
                    await getCourseById(
                        courseId
                    );

                setForm(res.data);

            } catch {

                showToast(
                    "error",
                    "Failed to load course"
                );

            }
        };

    const handleChange = (
        e
    ) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                if (courseId) {

                    await updateCourse(
                        courseId,
                        form
                    );

                    showToast(
                        "success",
                        "Course updated successfully"
                    );

                } else {

                    await createCourse(
                        form
                    );

                    showToast(
                        "success",
                        "Course created successfully"
                    );

                }

                refreshCourses();

                onClose();

            } catch {

                showToast(
                    "error",
                    "Save failed"
                );

            } finally {

                setLoading(false);

            }
        };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                courseId
                    ? "Edit Course"
                    : "Add Course"
            }
            size="xl"
        >

            <form
                onSubmit={
                    handleSubmit
                }
                className="space-y-4"
            >

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={
                            handleChange
                        }
                        placeholder="Title"
                        className="input-box"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Instructor
                    </label>

                    <input
                        name="instructorName"
                        value={
                            form.instructorName
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Instructor"
                        className="input-box"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <input
                        name="category"
                        value={
                            form.category
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Category"
                        className="input-box"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Duration
                    </label>

                    <input
                        name="duration"
                        value={
                            form.duration
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Duration"
                        className="input-box"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Enter course description"
                        className="
      w-full
      border
      border-gray-300
      rounded-lg
      px-3
      py-2
      focus:outline-none
      focus:ring-2
      focus:ring-[#254593]
    "
                    />
                </div>

                <select
                    name="status"
                    value={
                        form.status
                    }
                    onChange={
                        handleChange
                    }
                    className="input-box"
                >
                    <option>
                        Active
                    </option>

                    <option>
                        Inactive
                    </option>
                </select>

                <div className="flex justify-end gap-3 pt-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="secondary-btn"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="primary-btn"
                    >
                        {loading
                            ? "Saving..."
                            : courseId
                                ? "Update"
                                : "Create"}
                    </button>

                </div>

            </form>

        </Modal>
    );
};

export default CourseModal;