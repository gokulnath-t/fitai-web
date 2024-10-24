"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Markdown from "react-markdown";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Assuming these are properly adapted for web use
import {
  addAIChat,
  addToHistory,
  clearChat,
  clearHistory,
  clearSuggestions,
  resetAll,
  resetStep,
  updateAIChat,
  updateSuggestions,
} from "../../redux/slices/appSlice";
import { getSelected } from "./helper";

interface DishInfo {
  restaurant_name: string;
  dish: string;
  serving_size: number;
  calories: number;
  fat: number;
  sat_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  protein: number;
}

export interface AIChatType {
  message: string;
  nutrifacts?: DishInfo[];
  selection?: string;
  sender: "User" | "AI";
}

export default function Component() {
  const [prompt, setPrompt] = useState<string>("");
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    profileDetails,
    dietImprovement,
    mealRestriction,
    allergies,
    restaurants,
    AIchat,
    suggestions,
    history,
  } = useSelector((state: RootState) => state.app);

  const baseUrl = "http://14.97.127.234:8000";

  useEffect(() => {
    getSelectedFacts();

    return () => {
      dispatch(clearSuggestions());
      dispatch(clearChat())
      dispatch(clearHistory())
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [AIchat]);

  const getSelectedFacts = async () => {
    // Implementation similar to the original, adapted for web
    if (
      profileDetails.name.length &&
      // mealRestriction.length &&
      // dietImprovement.length &&
      allergies.length &&
      restaurants.length
    ) {
      const selection =
        `Hi ${profileDetails.name}, based on your selections:` +
        "\n" +
        getSelected(mealRestriction, dietImprovement, allergies);
      setAiLoading(true);
      const params = {
        allergies: allergies,
        current_height: Number(profileDetails.currentHeight),
        current_weight: Number(profileDetails.currentWeight),
        diet_improvement: dietImprovement,
        food_arround_me: restaurants,
        goal_weight: Number(profileDetails.goalWeight),
        meal_restriction: mealRestriction,
        prompt: false,
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(params);
      console.log("raw", raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response: SearchResponse = await fetch(
        baseUrl + "/search",
        requestOptions
      ).then((response) => response.json());

      console.log("responseresponse", JSON.stringify(response));
      setAiLoading(false);
      if (response?.result?.menus?.length) {
        const chat: AIChatType = {
          message: response.result.message_res ?? "",
          nutrifacts: response.result.menus,
          selection: selection,
          sender: "AI",
        };
        dispatch(updateAIChat(chat));
      } else {
        const chat: AIChatType = {
          message: "No dishes foudn based on your selection.",
          selection: selection,
          sender: "AI",
        };
        dispatch(updateAIChat(chat));
      }
    }
  };

  const handleSend = async (promptMsg: string) => {
    // Implementation similar to the original, adapted for web
    if (promptMsg.length > 0) {
      const userChat: AIChatType = {
        message: promptMsg,
        sender: "User",
      };
      dispatch(addAIChat(userChat));
      setPrompt("");

      setAiLoading(true);
      const params = {
        text: promptMsg,
        prompt: true,
        history: history,
      };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(params);
      console.log("rawrawrawrawraw", raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response: SearchResponse = await fetch(
        baseUrl + "/search",
        requestOptions
      ).then((response) => response.json());
      console.log("responseresponse", JSON.stringify(response));

      dispatch(
        addToHistory({
          role: "user",
          content: promptMsg,
        })
      );

      dispatch(
        addToHistory({
          role: "assistant",
          content: response.result.menus?.length
            ? JSON.stringify(response.result.menus).replaceAll(/\\/g,'')
            : response.result.message_res ?? "",
        })
      );
      if (response.result.suggestions?.length) {
        dispatch(updateSuggestions(response.result.suggestions));
      }
      setAiLoading(false);
      const chat: AIChatType = {
        message: response.result.message_res ?? "",
        nutrifacts: response.result.menus ?? [],
        selection: undefined,
        sender: "AI",
      };
      dispatch(addAIChat(chat));
    }
  };

  const renderFacts = (item: DishInfo) => (
    <TableRow key={item.dish}>
      <TableCell>{item.dish}</TableCell>
      <TableCell>{item.serving_size}</TableCell>
      <TableCell>{item.calories}</TableCell>
      <TableCell>{item.fat}</TableCell>
      <TableCell>{item.sat_fat}</TableCell>
      <TableCell>{item.trans_fat}</TableCell>
      <TableCell>{item.cholesterol}</TableCell>
      <TableCell>{item.sodium}</TableCell>
      <TableCell>{item.carbohydrates}</TableCell>
      <TableCell>{item.fiber}</TableCell>
      <TableCell>{item.sugar}</TableCell>
      <TableCell>{item.protein}</TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <header className="flex items-center justify-between p-4 bg-white bg-opacity-10 backdrop-blur-md">
        <Button
          variant="ghost"
          onClick={() => {
            dispatch(resetAll());
            dispatch(resetStep());
            navigate("/");
          }}
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>
        <h1 className="text-3xl font-bold">🦾 FitAi.</h1>
        <div className="w-10" />
      </header>

      <ScrollArea className="flex-grow p-4">
        {AIchat.map((item: AIChatType, index: number) => (
          <Card
            key={index}
            className={`mb-4 p-4 ${
              item.sender === "User" ? "ml-auto" : "mr-auto"
            } max-w-[80%] bg-transparent`}
          >
            <div className="flex items-center mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.sender === "User" ? "bg-blue-500" : "bg-green-500"
                } text-white`}
              >
                {item.sender === "User" ? "M" : "🦾"}
              </div>
              <span className="ml-2 font-semibold">{item.sender}</span>
            </div>
            {item.selection && <p className="mb-2 text-sm">{item.selection}</p>}
            <Markdown className={'text-left'}>{item.message}</Markdown>
            {item.nutrifacts && item.nutrifacts.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dish</TableHead>
                    <TableHead>Serving Size (g)</TableHead>
                    <TableHead>Calories (kcal)</TableHead>
                    <TableHead>Fat (g)</TableHead>
                    <TableHead>Sat Fat (g)</TableHead>
                    <TableHead>Trans Fat (g)</TableHead>
                    <TableHead>Cholesterol (mg)</TableHead>
                    <TableHead>Sodium (mg)</TableHead>
                    <TableHead>Carbs (g)</TableHead>
                    <TableHead>Fiber (g)</TableHead>
                    <TableHead>Sugar (g)</TableHead>
                    <TableHead>Protein (g)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{item.nutrifacts.map(renderFacts)}</TableBody>
              </Table>
            )}
          </Card>
        ))}
        {aiLoading && (
        <p className="text-lg text-green-600 text-left">Loading...</p>
        )}
        <div ref={chatEndRef} />
      </ScrollArea>

      {suggestions.length > 0 && (
        <div ref={suggestionsRef} className="flex overflow-x-auto h-10 align-center">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="mr-2 whitespace-nowrap"
              onClick={() => {
                handleSend(suggestion);
                dispatch(clearSuggestions());
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}

      {restaurants.length === 0 && (
        <div className="flex items-center">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="flex-grow mr-2"
            disabled={aiLoading}
          />
          <Button
            onClick={() => {
              dispatch(clearSuggestions());
              handleSend(prompt.trim());
            }}
            disabled={prompt.trim().length < 3 || aiLoading}
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      )}
    </div>
  );
}
