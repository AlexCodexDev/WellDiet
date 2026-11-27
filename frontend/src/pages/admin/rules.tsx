import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import { Notification } from "@/components/notification";

type RuleStatus = "Published" | "In review" | "Draft";

interface CategoryProps {
  id: string;
  name: string;
}

interface FactProps {
  code: string;
  name: string;
  description: string | null;
  questionText: string;
  isActive: number;
}

interface GoalProps {
  code: string;
  category_id: string;
  category_name: string;
  name: string;
  isActive: number;
}

interface ActionProps {
  code: string;
  name: string;
  description: string;
  isActive: number;
}
interface RuleItem {
  id: string;
  title: string;
  category: string;
  status: RuleStatus;
  updatedAt: string;
  ifCondition: string;
  thenAction: string;
  owner: string;
  version: string;
}

const initialRules: RuleItem[] = [
  {
    id: "RUL-024",
    title: "Flag missing allergen information",
    category: "Recipe safety",
    status: "In review",
    updatedAt: "Nov 9, 2026",
    ifCondition: "A recipe has no allergen information",
    thenAction: "Hold publication and request a nutritionist review.",
    owner: "Sarah Miller",
    version: "1.2",
  },
  {
    id: "RUL-023",
    title: "Match meal plans to dietary preferences",
    category: "Nutrition plans",
    status: "Published",
    updatedAt: "Nov 8, 2026",
    ifCondition: "Member selects vegetarian, vegan, or gluten-free preference",
    thenAction: "Filter out incompatible ingredients and recalculate macro balance.",
    owner: "Emma Collins",
    version: "2.0",
  },
  {
    id: "RUL-022",
    title: "Review incomplete diagnosis answers",
    category: "Diagnosis",
    status: "Published",
    updatedAt: "Nov 7, 2026",
    ifCondition: "Body stats or target weight fields contain incomplete values",
    thenAction: "Prompt member to complete required inputs before generating plan.",
    owner: "Alex Morgan",
    version: "1.4",
  },
  {
    id: "RUL-021",
    title: "Prompt a weekly wellbeing check-in",
    category: "Member care",
    status: "Published",
    updatedAt: "Nov 6, 2026",
    ifCondition: "Member has logged meals for 7 consecutive days",
    thenAction: "Send a gentle weekly progress reflection and hydration reminder.",
    owner: "Sarah Miller",
    version: "1.1",
  },
  {
    id: "RUL-020",
    title: "Route conflicting answers to an expert",
    category: "Diagnosis",
    status: "Draft",
    updatedAt: "Nov 5, 2026",
    ifCondition: "Target weight change exceeds safe weekly threshold for current BMI",
    thenAction: "Flag profile for certified dietitian consultation before plan activation.",
    owner: "Emma Collins",
    version: "0.9",
  },
];

const summaryMetrics = [
  {
    label: "Total rules",
    value: "24",
    subtitle: "Across 6 nutrition categories",
  },
  {
    label: "Published",
    value: "18",
    subtitle: "Available to the diagnosis engine",
  },
  {
    label: "In review",
    value: "4",
    subtitle: "Awaiting expert approval",
  },
  {
    label: "Drafts",
    value: "2",
    subtitle: "Not yet used in recommendations",
  },
];

const reviewActivities = [
  {
    id: "act-1",
    title: "Rule submitted for review",
    meta: "Sarah Miller · RUL-024 · 12 min ago",
  },
  {
    id: "act-2",
    title: "Dietary preferences rule published",
    meta: "Emma Collins · RUL-023 · 1 hour ago",
  },
  {
    id: "act-3",
    title: "Diagnosis condition updated",
    meta: "Alex Morgan · RUL-022 · Yesterday",
  },
];

export const RulesAndFactsPage: React.FC = () => {
  const [rules, setRules] = useState<RuleItem[]>(initialRules);
  const [selectedRuleId, setSelectedRuleId] = useState<string>("RUL-024");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalDeleteTitle, setModalDeleteTitle] = useState<string>("");
  const [categoryData, setCategoryData] = useState<CategoryProps[]>([]);

  // START: Declaration modal open
  const [isModalRuleOpen, setIsModalRuleOpen] = useState<boolean>(false);
  const [isModalFactOpen, setIsModalFactOpen] = useState<boolean>(false);
  const [isModalGoalOpen, setIsModalGoalOpen] = useState<boolean>(false);
  const [isModalActionOpen, setIsModalActionOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  // END: Declaration modal open

  // START: Declaration for facts
  const [factData, setFactData] = useState<FactProps[]>([]);
  const [factName, setFactName] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [factDescription, setFactDescription] = useState<string | null>(null);
  const [factStatus, setFactStatus] = useState<string | null>(null);
  const [selectedFactCode, setSelectedFactCode] = useState<string | null>(null);
  const [factCount, setFactCount] = useState<number>(0);
  const [factLastAdded, setFactLastAdded] = useState<string>("");
  const [factModalLabel, setFactModalLabel] = useState<string>("");
  // END: Declaration for facts
  
  // START: Declaration for goals
  const [goalData, setGoalData] = useState<GoalProps[]>([]);
  const [goalName, setGoalName] = useState<string>("");
  const [goalCategory, setGoalCategory] = useState<string>("");
  const [goalStatus, setGoalStatus] = useState<string | null>(null);
  const [selectedGoalCode, setSelectedGoalCode] = useState<string | null>(null);
  const [goalCount, setGoalCount] = useState<number>(0);
  const [goalLatestAdded, setGoalLatestAdded] = useState<string>("");
  const [goalModalLabel, setGoalModalLabel] = useState<string>("");
  // END: Declaration for goals

  // START: Declaration for actions
  const [actionData, setActionData] = useState<ActionProps[]>([]);
  const [actionName, setActionName] = useState<string>("");
  const [actionDescription, setActionDescription] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [selectedActionCode, setSelectedActionCode] = useState<string | null>(null);
  const [actionCount, setActionCount] = useState<number>(0);
  const [actionLatestAdded, setActionLatestAdded] = useState<string>("");
  const [actionModalLabel, setActionModalLabel] = useState<string>("");
  // END: Declaration for actions

  // State untuk form tambah rule baru
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Recipe safety");
  const [newIf, setNewIf] = useState("");
  const [newThen, setNewThen] = useState("");

  const filteredRules = rules.filter((rule) => {
    const matchesCat = categoryFilter === "all" || rule.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  const activeRule =
    rules.find((r) => r.id === selectedRuleId) || filteredRules[0] || rules[0];

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIf.trim() || !newThen.trim()) return;

    const nextNumber = 25 + (rules.length - initialRules.length);
    const created: RuleItem = {
      id: `RUL-0${nextNumber}`,
      title: newTitle.trim(),
      category: newCategory,
      status: "Draft",
      updatedAt: "Nov 9, 2026",
      ifCondition: newIf.trim(),
      thenAction: newThen.trim(),
      owner: "Emma Collins",
      version: "1.0",
    };

    setRules([created, ...rules]);
    setSelectedRuleId(created.id);
    setNewTitle("");
    setNewIf("");
    setNewThen("");
    setIsModalRuleOpen(false);
  };

  // START: Fetch category
  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/fetch`
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }
      
      setCategoryData(result);
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    }
  }
  // END: Fetch category

  // START: Fetch fact
  const fetchFact = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fact/fetch`
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      if(result.length > 0) {
        setFactLastAdded(
          new Date(result[0].created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          })
        );
      }

      setFactCount(result.length);
      setFactData(
        result.map(({ question_text, is_active, ...item }: any) => ({
          ...item,
          questionText: question_text,
          isActive: is_active
        }))
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Fetch fact

  // START: Create fact
  const handleAddFact = async () => {
    setIsLoading(true);

    if(!factName) {
      Notification(
        "Fact name cannot be empty.",
        "warning",
        false
      );

      return;
    }

    if(!questionText) {
      Notification(
        "Question cannot be empty.",
        "warning",
        false
      );

      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fact/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: factName,
            question: questionText,
            description: factDescription
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );
        
        return;
      }

      await fetchFact();

      clearFact();
      setIsModalFactOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Create fact

  // START: Update fact
  const handleUpdateFact = async () => {
    setIsLoading(true);

    if(!factName) {
      Notification(
        "Fact name cannot be empty.",
        "warning",
        false
      );

      return;
    }

    if(!questionText) {
      Notification(
        "Question cannot be empty.",
        "warning",
        false
      );

      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fact/update/${selectedFactCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: factName,
            questionText,
            description: factDescription,
            isActive: factStatus
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchFact();

      clearFact();
      setIsModalFactOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  } 
  // END: Update fact

  // START: Delete fact
  const handleDeleteFact = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fact/delete/${selectedFactCode}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchFact();

      clearFact();
      setIsModalDeleteOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(true);
    }
  }
  // END: Delete fact

  // START: Fetch goal
  const fetchGoal = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/goal/fetch`
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      if(result.length > 0) {
        setGoalLatestAdded(
          new Date(result[0].created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          })
        )
      }

      setGoalCount(result.length);
      setGoalData(
        result.map(({is_active, ...item}: any) => ({
          ...item,
          isActive: is_active
        }))
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Fetch goal

  // START: Create goal
  const handleAddGoal = async () => {
    setIsLoading(true);
    
    if(!goalName) {
      Notification(
        "Goal name cannot be empty.",
        "warning",
        false
      );
      
      return;
    }

    if(!goalCategory) {
      Notification(
        "Goal category cannot be empty.",
        "warning",
        false
      );
      
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/goal/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: goalName,
            category: goalCategory
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchGoal();

      clearGoal();
      setIsModalGoalOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Create goal

  // START: Update goal
  const handleUpdateGoal = async () => {
    setIsLoading(true);

    if(!goalName) {
      Notification(
        "Goal name cannot be empty.",
        "warning",
        false
      );
      
      return;
    }

    if(!goalCategory) {
      Notification(
        "Goal category cannot be empty.",
        "warning",
        false
      );
      
      return;
    }
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/goal/update/${selectedGoalCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: goalName,
            category: goalCategory,
            isActive: goalStatus
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchGoal();

      clearGoal();
      setIsModalGoalOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Update goal

  // START: Delete goal
  const handleDeleteGoal = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/goal/delete/${selectedGoalCode}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchGoal();

      setIsModalDeleteOpen(false);
      setSelectedGoalCode(null);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Delete goal

  // START: Fetch action
  const fetchAction = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/action/fetch`
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      if(result.length > 0) {
        setActionLatestAdded(
          new Date(result[0].created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          })
        );
      }
      setActionCount(result.length);
      setActionData(
        result.map(({ is_active, ...item }: any) => ({
          ...item,
          isActive: is_active
        }))
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Fetch action

  // START: Create action
  const handleAddAction = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/action/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: actionName,
            description: actionDescription
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchAction();

      clearAction();
      setIsModalActionOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Create action

  // START: Update action
  const handleUpdateAction = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/action/update/${selectedActionCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: actionName,
            description: actionDescription,
            isActive: actionStatus
          })
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchAction();

      clearAction();
      setIsModalActionOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Update action

  // START: Delete action
  const handleDeleteAction = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/action/delete/${selectedActionCode}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const result = await response.json();

      if(!response.ok) {
        Notification(
          result,
          "error",
          false
        );

        return;
      }

      await fetchAction();

      clearAction();
      setIsModalDeleteOpen(false);

      Notification(
        result,
        "success",
        false
      );
    } catch (error: any) {
      Notification(
        error.message,
        "error",
        false
      );
    } finally {
      setIsLoading(false);
    }
  }
  // END: Delete action

  // START: Clear function
  function clearFact() {
    setFactName("");
    setFactDescription("");
    setQuestionText("");
    setFactStatus("");
    setSelectedFactCode(null);
  }

  function clearGoal() {
    setGoalName("");
    setGoalCategory("");
    setGoalStatus("");
    setSelectedGoalCode(null);
  }

  function clearAction() {
    setActionName("");
    setActionDescription("");
    setActionStatus("");
    setSelectedActionCode(null);
  }
  // END: Clear function

  const renderStatusPill = (status: RuleStatus) => {
    if (status === "Published") {
      return (
        <span className="inline-flex items-center rounded-full bg-[#E4ECE1] px-3 py-0.5 text-[11px] font-medium text-[#2C4C3B]">
          Published
        </span>
      );
    }
    if (status === "In review") {
      return (
        <span className="inline-flex items-center rounded-full bg-[#F3EBDD] px-3 py-0.5 text-[11px] font-medium text-[#8C6D3F]">
          In review
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-[#EFECE6] px-3 py-0.5 text-[11px] font-medium text-[#7B7468]">
        Draft
      </span>
    );
  };

  // START: Update handle function
  function handleUpdateFactModal(
    name: string,
    description: string,
    question: string,
    isActive: number
  ) {
    const status = isActive === 0 ? "in_active" : "active";

    setFactName(name);
    setFactDescription(description);
    setQuestionText(question);
    setFactStatus(status);
    setIsModalFactOpen(true);
  }

  function handleUpdateGoalModal(
    name: string,
    category: string,
    isActive: number
  ) {
    const status = isActive === 0 ? "in_active" : "active";

    setGoalName(name);
    setGoalCategory(category);
    setGoalStatus(status);
    setIsModalGoalOpen(true);
  }

  function handleUpdateActionModal(
    name: string,
    description: string,
    isActive: number
  ) {
    const status = isActive === 0 ? "in_active" : "active";

    setActionName(name);
    setActionDescription(description);
    setActionStatus(status);
    setIsModalActionOpen(true);
  }
  // END: Update handle function

  useEffect(() => {
    fetchCategory();
    fetchFact();
    fetchGoal();
    fetchAction();
  }, []);

  return (
    <AdminLayout>
      <div className="mx-auto max-w-330 space-y-6">
        {/* Top Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5D7366]">
              Knowledge That Cares
            </p>
            <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#182B20] sm:text-[36px]">
              Rules &amp; facts
            </h1>
            <p className="mt-1 text-xs text-[#5A6560] sm:text-sm">
              Keep your nutrition knowledge clear, consistent, and ready for expert review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-[#182B20] transition-colors hover:bg-stone-50"
            >
              Import rules
            </button>

            <button
              type="button"
              onClick={() => setIsModalRuleOpen(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
            >
              <span>+</span>
              <span>Add rule</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-stone-200/90 bg-white p-5 transition-shadow hover:shadow-2xs"
            >
              <p className="text-xs font-medium text-[#5A6560]">{item.label}</p>
              <p className="mt-3 font-serif text-3xl font-normal text-[#182B20]">{item.value}</p>
              <p className="mt-2.5 text-[11px] text-[#7D8A83]">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* START: Section facts & goals */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* START: Section facts */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
            {/* Card Header */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-xl font-normal text-[#182B20]">Manage Facts</h2>
                <p className="mt-0.5 text-xs text-[#7D8A83]">
                  {factCount > 1 ? `${factCount} facts` : `${factCount} fact`} {factLastAdded === "" || `· Last added ${factLastAdded}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                  className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="all">Filter</option>
                  <option value="Published">Active</option>
                  <option value="In review">In Active</option>
                </select>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsModalFactOpen(true);
                    setFactModalLabel("Add");
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
                >
                <span>+</span>
                <span>Add fact</span>
              </button>
              </div>
            </div>

            {/* Facts Table */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-y border-stone-200/80 text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                    <th className="py-3 pr-4 pl-2">Fact ID</th>
                    <th className="py-3 pr-4">Name</th>
                    <th className="py-3 pr-4">Question</th>
                    <th className="py-3 pr-4">Description</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {factData.length > 0 ? (
                    factData.map((item) => (
                      <tr
                        key={item.code}
                        className={`cursor-pointer transition-colors hover:bg-[#FAF9F6]`}
                      >
                        <td className="py-3.5 pr-4 pl-2 font-semibold whitespace-nowrap text-[#3A5446]">
                          {item.code}
                        </td>
                        <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{item.name}</td>
                        <td className="py-3.5 pr-4 whitespace-nowrap font-semibold text-[#182B20]">
                          {item.questionText}
                        </td>
                        <td className="py-3.5 pr-4 whitespace-nowrap font-semibold text-[#182B20]">
                          {item.description || "-"}
                        </td>
                        <td className="py-3.5 pr-4 whitespace-nowrap">
                          {item.isActive === 1 ?
                              <span className="bg-[#2C4C3B] py-2 px-2 text-white rounded-2xl w-20 text-center">Active</span> :
                              <span className="bg-[#E7ECE2] py-2 px-2 text-bg-[#2C4C3B] rounded-2xl w-20 text-center">In Active</span>
                            }
                        </td>
                        <td className="py-3.5 flex gap-2 justify-end text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFactCode(item.code);
                              setFactModalLabel("Edit");
                              handleUpdateFactModal(
                                item.name,
                                item.description ?? "",
                                item.questionText,
                                item.isActive
                              );
                            }}
                            className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                          >
                            <span>Edit</span>
                            <span aria-hidden="true">→</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFactCode(item.code);
                              setModalDeleteTitle("fact");
                              setIsModalDeleteOpen(true);
                            }}
                            className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                          >
                            <span>Delete</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-3.5 text-center whitespace-nowrap">No Records.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-[11px] text-[#7D8A83]">
              <span>Showing 1–{filteredRules.length} of 24 rules</span>
              <div className="flex items-center gap-1">
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &lt;
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#E6EDE4] px-2.5 py-1 font-semibold text-[#2C4C3B]"
                >
                  1
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  2
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  3
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  4
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  5
                </button>
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {/* END: Section facts */}

          {/* START: Section goals */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
            {/* Card Header */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-xl font-normal text-[#182B20]">Manage Goals</h2>
                <p className="mt-0.5 text-xs text-[#7D8A83]">
                  {goalCount > 1 ? `${goalCount} goals` : `${goalCount} goal`} {goalLatestAdded === "" || `· Last added ${goalLatestAdded}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by category"
                  className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="all">All categories</option>
                  <option value="Recipe safety">Recipe safety</option>
                  <option value="Nutrition plans">Nutrition plans</option>
                  <option value="Diagnosis">Diagnosis</option>
                  <option value="Member care">Member care</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                  className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="all">Filter</option>
                  <option value="Published">Active</option>
                  <option value="In review">In Active</option>
                </select>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsModalGoalOpen(true);
                    clearGoal();
                    setGoalModalLabel("Add");
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
                >
                <span>+</span>
                <span>Add goal</span>
              </button>
              </div>
            </div>

            {/* Goals Table */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-y border-stone-200/80 text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                    <th className="py-3 pr-4 pl-2">Goal Code</th>
                    <th className="py-3 pr-4 pl-2">Category</th>
                    <th className="py-3 pr-4">Name</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {goalData.length > 0 ? (
                    goalData.map((item) => (
                      <tr
                        key={item.code}
                        className={`cursor-pointer transition-colors hover:bg-[#FAF9F6]`}
                      >
                        <td className="py-3.5 pr-4 pl-2 font-semibold whitespace-nowrap text-[#3A5446]">
                          {item.code}
                        </td>
                        <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{item.category_name}</td>
                        <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{item.name}</td>
                        <td className="py-3.5 pr-4 whitespace-nowrap">
                          {item.isActive === 1 ?
                              <span className="bg-[#2C4C3B] py-2 px-2 text-white rounded-2xl w-20 text-center">Active</span> :
                              <span className="bg-[#E7ECE2] py-2 px-2 text-bg-[#2C4C3B] rounded-2xl w-20 text-center">In Active</span>
                            }
                        </td>
                        <td className="py-3.5 flex gap-2 justify-end text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearGoal();
                              setSelectedGoalCode(item.code);
                              setGoalModalLabel("Edit");
                              handleUpdateGoalModal(
                                item.name,
                                item.category_id,
                                item.isActive
                              )
                            }}
                            className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                          >
                            <span>Edit</span>
                            <span aria-hidden="true">→</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGoalCode(item.code);
                              setModalDeleteTitle("goal");
                              setIsModalDeleteOpen(true);
                            }}
                            className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                          >
                            <span>Delete</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-3.5 text-center whitespace-nowrap">No records.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-[11px] text-[#7D8A83]">
              <span>Showing 1–{filteredRules.length} of 24 rules</span>
              <div className="flex items-center gap-1">
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &lt;
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#E6EDE4] px-2.5 py-1 font-semibold text-[#2C4C3B]"
                >
                  1
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  2
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  3
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  4
                </button>
                <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                  5
                </button>
                <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {/* END: Section goals */}
        </div>
        {/* END: Section facts & goals */}

        {/* START: Section actions */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
          {/* Card Header */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Manage Actions</h2>
              <p className="mt-0.5 text-xs text-[#7D8A83]">
                {actionCount > 1 ? `${actionCount} actions` : `${actionCount} action`} {actionLatestAdded === "" || `· Last added ${actionLatestAdded}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
                className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
              >
                <option value="all">Filter</option>
                <option value="Published">Active</option>
                <option value="In review">In Active</option>
              </select>
              
              <button
                type="button"
                onClick={() => {
                  setIsModalActionOpen(true);
                  clearAction();
                  setActionModalLabel("Add");
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2C4C3B] px-4 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-[#213A2D]"
              >
              <span>+</span>
              <span>Add action</span>
            </button>
            </div>
          </div>

          {/* Goals Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-stone-200/80 text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                  <th className="py-3 pr-4 pl-2">Action Code</th>
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Description</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {actionData.length > 0 ? (
                  actionData.map((item) => (
                    <tr
                      key={item.code}
                      className={`cursor-pointer transition-colors hover:bg-[#FAF9F6]`}
                    >
                      <td className="py-3.5 pr-4 pl-2 font-semibold whitespace-nowrap text-[#3A5446]">
                        {item.code}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{item.name}</td>
                      <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{item.description || "-"}</td>
                      <td className="py-3.5 pr-4 whitespace-nowrap">
                        {item.isActive === 1 ?
                            <span className="bg-[#2C4C3B] py-2 px-2 text-white rounded-2xl w-20 text-center">Active</span> :
                            <span className="bg-[#E7ECE2] py-2 px-2 text-bg-[#2C4C3B] rounded-2xl w-20 text-center">In Active</span>
                          }
                      </td>
                      <td className="py-3.5 flex gap-2 justify-end text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearGoal();
                            setSelectedActionCode(item.code);
                            setActionModalLabel("Edit");
                            handleUpdateActionModal(
                              item.name,
                              item.description ?? "",
                              item.isActive
                            )
                          }}
                          className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                        >
                          <span>Edit</span>
                          <span aria-hidden="true">→</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedActionCode(item.code);
                            setModalDeleteTitle("action");
                            setIsModalDeleteOpen(true);
                          }}
                          className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                        >
                          <span>Delete</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-3.5 text-center whitespace-nowrap">No records.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-[11px] text-[#7D8A83]">
            <span>Showing 1–{filteredRules.length} of 24 rules</span>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &lt;
              </button>
              <button
                type="button"
                className="rounded-md bg-[#E6EDE4] px-2.5 py-1 font-semibold text-[#2C4C3B]"
              >
                1
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                2
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                3
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                4
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                5
              </button>
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &gt;
              </button>
            </div>
          </div>
        </div>
        {/* END: Section actions */}

        {/* Middle Table Card: Your Rules */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6">
          {/* Card Header */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Your rules</h2>
              <p className="mt-0.5 text-xs text-[#7D8A83]">
                24 rules · Last updated Nov 9, 2026
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter by category"
                className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
              >
                <option value="all">All categories</option>
                <option value="Recipe safety">Recipe safety</option>
                <option value="Nutrition plans">Nutrition plans</option>
                <option value="Diagnosis">Diagnosis</option>
                <option value="Member care">Member care</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
                className="cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
              >
                <option value="all">Filter</option>
                <option value="Published">Published</option>
                <option value="In review">In review</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Rules Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-stone-200/80 text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83]">
                  <th className="py-3 pr-4 pl-2">Rule ID</th>
                  <th className="py-3 pr-4">Rule &amp; Condition</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Updated</th>
                  <th className="py-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filteredRules.map((rule) => {
                  const isSelected = rule.id === activeRule.id;
                  return (
                    <tr
                      key={rule.id}
                      onClick={() => setSelectedRuleId(rule.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-[#F4F6F0]" : "hover:bg-[#FAF9F6]"
                      }`}
                    >
                      <td className="py-3.5 pr-4 pl-2 font-semibold whitespace-nowrap text-[#3A5446]">
                        {rule.id}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-[#182B20]">{rule.title}</td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-[#5A6560]">
                        {rule.category}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap">
                        {renderStatusPill(rule.status)}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-[#6E7A74]">
                        {rule.updatedAt}
                      </td>
                      <td className="py-3.5 flex gap-2 justify-end text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRuleId(rule.id);
                          }}
                          className="inline-flex cursor-pointer items-center gap-1 font-medium text-[#2C4C3B] hover:underline"
                        >
                          <span>Edit</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-[11px] text-[#7D8A83]">
            <span>Showing 1–{filteredRules.length} of 24 rules</span>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &lt;
              </button>
              <button
                type="button"
                className="rounded-md bg-[#E6EDE4] px-2.5 py-1 font-semibold text-[#2C4C3B]"
              >
                1
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                2
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                3
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                4
              </button>
              <button type="button" className="rounded-md px-2.5 py-1 hover:bg-stone-100">
                5
              </button>
              <button type="button" className="rounded-md px-2 py-1 hover:bg-stone-100">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Split Section: Rule Preview + Review Activity */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left 8 Cols: Rule Preview */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-8">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-normal text-[#182B20]">Rule preview</h2>
                {renderStatusPill(activeRule.status)}
              </div>

              {/* Eyebrow */}
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[#5D7366]">
                {activeRule.id} · {activeRule.category}
              </p>

              {/* Rule Title */}
              <h3 className="mt-1.5 font-serif text-2xl font-normal text-[#182B20]">
                {activeRule.title}
              </h3>

              {/* IF / THEN Logic Box */}
              <div className="mt-4 space-y-3 rounded-2xl bg-[#F4F5EF] p-5">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83] sm:col-span-1">
                    IF
                  </span>
                  <p className="text-xs font-medium text-[#182B20] sm:col-span-11">
                    {activeRule.ifCondition}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8A83] sm:col-span-1">
                    THEN
                  </span>
                  <p className="text-xs font-medium text-[#182B20] sm:col-span-11">
                    {activeRule.thenAction}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <p className="mt-4 text-[11px] text-[#7D8A83]">
                Owner: {activeRule.owner} · Version {activeRule.version} · Updated{" "}
                {activeRule.updatedAt}
              </p>
            </div>

            {/* Bottom Link */}
            <div className="mt-5 pt-2">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>View full rule</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Right 4 Cols: Review Activity */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 lg:col-span-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#182B20]">Review activity</h2>

              <div className="mt-5 divide-y divide-stone-100">
                {reviewActivities.map((activity) => (
                  <div key={activity.id} className="py-3.5 first:pt-0 last:pb-0">
                    <p className="text-xs font-semibold text-[#182B20]">{activity.title}</p>
                    <p className="mt-1 text-[11px] text-[#7D8A83]">{activity.meta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-2">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#2C4C3B] hover:underline"
              >
                <span>View all activity</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* START: Modal fact */}
      {isModalFactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">{factModalLabel.toLowerCase() === "add" ? `Add new fact` : `Edit fact`}</h3>
              <button
                type="button"
                onClick={() => setIsModalFactOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                selectedFactCode !== null ?
                  handleUpdateFact() :
                  handleAddFact()

              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Fact name <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={factName}
                  onChange={(e) => setFactName(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Question <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Description (Optional)
                </label>
                <textarea
                  value={factDescription ?? ""}
                  onChange={(e) => setFactDescription(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full h-20 rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              {selectedFactCode !== null && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                    Active Status <span className="text-[#182B20]">*</span>
                  </label>
                  <select
                    value={factStatus ?? ""}
                    onChange={(e) => setFactStatus(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="in_active">In Active</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalFactOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                > 
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* END: Modal fact */}

      {/* START: Modal goal */}
      {isModalGoalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">{goalModalLabel.toLowerCase() === "add" ? `Add new goal` : `Edit goal`}</h3>
              <button
                type="button"
                onClick={() => setIsModalGoalOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                selectedGoalCode !== null ?
                  handleUpdateGoal() :
                  handleAddGoal()

              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Goal name <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Category <span className="text-[#182B20]">*</span>
                </label>
                <select
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="">Choose category</option>
                  {categoryData.map((item: any) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              {selectedGoalCode !== null && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                    Active Status <span className="text-[#182B20]">*</span>
                  </label>
                  <select
                    value={goalStatus ?? ""}
                    onChange={(e) => setGoalStatus(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="in_active">In Active</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalGoalOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                >
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* END: Modal fact */}

      {/* START: Modal action */}
      {isModalActionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">{actionModalLabel.toLowerCase() === "add" ? `Add new action` : `Edit action`}</h3>
              <button
                type="button"
                onClick={() => setIsModalActionOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                selectedActionCode !== null ?
                  handleUpdateAction() :
                  handleAddAction()

              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Action name <span className="text-[#182B20]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={actionName}
                  onChange={(e) => setActionName(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Description (Optional)
                </label>
                <textarea
                  value={actionDescription ?? ""}
                  onChange={(e) => setActionDescription(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full h-20 rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              {selectedActionCode !== null && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                    Active Status <span className="text-[#182B20]">*</span>
                  </label>
                  <select
                    value={actionStatus ?? ""}
                    onChange={(e) => setActionStatus(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="in_active">In Active</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalActionOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                > 
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* END: Modal action */}

      {/* Modal Tambah Rule Baru */}
      {isModalRuleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Add new rule</h3>
              <button
                type="button"
                onClick={() => setIsModalRuleOpen(false)}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRule} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  Rule name
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Flag high sodium meals"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                >
                  <option value="Recipe safety">Recipe safety</option>
                  <option value="Nutrition plans">Nutrition plans</option>
                  <option value="Diagnosis">Diagnosis</option>
                  <option value="Member care">Member care</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  IF Condition
                </label>
                <input
                  type="text"
                  required
                  value={newIf}
                  onChange={(e) => setNewIf(e.target.value)}
                  placeholder="When condition is met..."
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#182B20]">
                  THEN Action
                </label>
                <input
                  type="text"
                  required
                  value={newThen}
                  onChange={(e) => setNewThen(e.target.value)}
                  placeholder="Execute system action..."
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-[#182B20] focus:border-[#2C4C3B] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalRuleOpen(false)}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-[#5A6560] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-xs font-medium text-white hover:bg-[#213A2D]"
                >
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* START: Delete Confirmation Modal */}
      {isModalDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-normal text-[#182B20]">Delete Confirmation</h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalDeleteOpen(false);
                  clearFact();
                }}
                className="rounded-lg p-1 text-[#6E7A74] hover:bg-stone-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col justify-center items-center py-4">
              <h3 className="text-2xl font-bold">Are You Sure?</h3>
              <p>Deleted {modalDeleteTitle} cannot be retieve.</p>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalDeleteOpen(false);
                    clearFact();
                  }}
                  className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-[#5A6560] hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#2C4C3B] px-5 py-2 text-sm font-medium text-white hover:bg-[#213A2D] cursor-pointer"
                  onClick={() => {
                    if(modalDeleteTitle === "fact" && selectedFactCode !== null) {
                      handleDeleteFact();
                    } else if(modalDeleteTitle === "goal" && selectedGoalCode !== null) {
                      handleDeleteGoal();
                    } else if(modalDeleteTitle === "action" && selectedActionCode !== null) {
                      handleDeleteAction();
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* END: Delete Confirmation Modal */}
    </AdminLayout>
  );
};

export default RulesAndFactsPage;