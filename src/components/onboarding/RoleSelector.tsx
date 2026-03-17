"use client";

type RoleSelectorProps = {
  selected: "buyer" | "owner" | null;
  onSelect: (role: "buyer" | "owner") => void;
};

export function RoleSelector({ selected, onSelect }: RoleSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
        What&apos;s your intent?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Buyer Card */}
        <button
          onClick={() => onSelect("buyer")}
          className={`p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            selected === "buyer"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          }`}
        >
          <div className="text-4xl mb-3">🏡</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Find a home
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse and purchase properties
          </p>
        </button>

        {/* Owner Card */}
        <button
          onClick={() => onSelect("owner")}
          className={`p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            selected === "owner"
              ? "border-lime-500 bg-lime-50 dark:bg-lime-900/20 shadow-lg"
              : "border-gray-200 dark:border-gray-700 hover:border-lime-300 dark:hover:border-lime-600"
          }`}
        >
          <div className="text-4xl mb-3">📢</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Sell my property
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            List and manage properties
          </p>
        </button>
      </div>
    </div>
  );
}
