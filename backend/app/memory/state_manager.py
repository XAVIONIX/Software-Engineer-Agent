import json
import os
from pymongo import MongoClient
from typing import Any, Optional


class StateManager:
    def __init__(
        self,
        mongo_url: str = None,
        mongo_db: str = None
    ):
        mongo_url = mongo_url or os.getenv("MONGO_URL", "mongodb://localhost:27017")
        mongo_db = mongo_db or os.getenv("DB_NAME", "ai_memory")

        # MongoDB (Persistent Storage)
        try:
            self.mongo_client = MongoClient(mongo_url)
            self.mongo_db = self.mongo_client[mongo_db]
            print("✅ MongoDB connected successfully")
        except Exception as e:
            print("❌ MongoDB connection failed:", e)
            self.mongo_db = None



    # Legacy method names (alias for backward compatibility)
    def save_hot_state(self, key: str, value: Any, ttl: int = 3600):
        """Alias for save_state - saves to MongoDB instead of Redis"""
        self.save_state("sessions", key, value)

    def get_hot_state(self, key: str) -> Optional[Any]:
        """Alias for get_state - retrieves from MongoDB instead of Redis"""
        return self.get_state("sessions", key)

    def delete_hot_state(self, key: str):
        """Alias for delete_state - deletes from MongoDB instead of Redis"""
        self.delete_state("sessions", key)

    # Legacy cold storage methods
    def save_cold_state(self, collection: str, data: dict):
        if self.mongo_db is None:
            return None
        col = self.mongo_db[collection]
        result = col.insert_one(data)
        return str(result.inserted_id)

    def get_cold_state(self, collection: str, query: dict) -> Optional[list]:
        if self.mongo_db is None:
            return None
        col = self.mongo_db[collection]
        return list(col.find(query, {"_id": 0}))

    def smart_get(
        self,
        session_key: str,
        collection: str,
        query: dict,
        ttl: int = 3600
    ) -> Optional[Any]:
        """Get from MongoDB (single unified storage)"""
        return self.get_state(collection, session_key)

    # -----------------------------
    # COLD MEMORY (MONGODB)
    # -----------------------------
    def save_cold_state(self, collection: str, data: dict):
        if self.mongo_db is None:
            return None
        col = self.mongo_db[collection]
        result = col.insert_one(data)
        return str(result.inserted_id)

    def get_cold_state(self, collection: str, query: dict) -> Optional[list]:
        if self.mongo_db is None:
            return None
        col = self.mongo_db[collection]
        return list(col.find(query, {"_id": 0}))

    # -----------------------------
    # SMART MEMORY RETRIEVAL
    # -----------------------------
    def smart_get(
        self,
        session_key: str,
        collection: str,
        query: dict,
        ttl: int = 3600
    ) -> Optional[Any]:

        # 1️⃣ Redis first
        hot_data = self.get_hot_state(session_key)
        if hot_data:
            return hot_data

        # 2️⃣ Mongo fallback
        cold_data = self.get_cold_state(collection, query)
        if cold_data:
            self.save_hot_state(session_key, cold_data, ttl)
            return cold_data

        return None
