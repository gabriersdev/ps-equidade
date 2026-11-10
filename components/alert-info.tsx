"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import { appConfigs } from "@/resources/resources";
import { alerts } from "@/resources/alerts-data";
import { AlertInfoItem } from "@/components/alert-info-item";

moment.locale(appConfigs.locale);

export default function AlertInfo() {
  const [hiddenAlerts, setHiddenAlerts] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const storageKey = `escudo-app-${appConfigs["app-name-slug"]}-hidden-alerts`;

  useEffect(() => {
    const storedHiddenAlerts = localStorage.getItem(storageKey);
    if (storedHiddenAlerts) {
      try {
        setHiddenAlerts(JSON.parse(storedHiddenAlerts));
      } catch (e) {
        console.error("Failed to parse hidden alerts from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  function handleClose(id: string) {
    setHiddenAlerts((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  }

  if (!isLoaded) return null;

  const currentDate = moment();
  const visibleAlerts = alerts.filter((alert) => {
    const datetimeMaxShowAlert = moment(alert.datetimeMaxShow);
    return !currentDate.isAfter(datetimeMaxShowAlert) && !hiddenAlerts.includes(alert.id);
  });

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="overflow-x-clip">
      <AnimatePresence initial={false}>
        {visibleAlerts.map((alert, index) => (
          <AlertInfoItem
            key={alert.id || index}
            alert={alert}
            onDismiss={handleClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
