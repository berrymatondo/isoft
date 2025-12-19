"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const clientSchema = z.object({
  firstname: z.string().min(1, "Le prénom est requis"),
  lastname: z.string().min(1, "Le nom est requis"),
  gender: z.enum(["Homme", "Femme"]),
  maritalstatus: z.enum(["M", "C"]),
  birthday: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

export function NewClientForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [age, setAge] = useState<string>("---");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      gender: "Homme",
      maritalstatus: "C",
    },
  });

  const birthday = watch("birthday");

  // Calculate age when birthday changes
  useEffect(() => {
    if (birthday) {
      const birthDate = new Date(birthday);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      setAge(calculatedAge.toString());
    } else {
      setAge("---");
    }
  }, [birthday]);

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          birthday: data.birthday
            ? new Date(data.birthday).toISOString()
            : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du client");
      }

      toast.success("Client créé avec succès");
      router.push("/");
    } catch (error) {
      console.error("[v0] Error creating client:", error);
      toast.error("Erreur lors de la création du client");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* SIGNALÉTIQUE Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-primary">
            SIGNALÉTIQUE
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="firstname">Prénom</Label>
              <Input
                id="firstname"
                {...register("firstname")}
                className="mt-1.5"
                placeholder="Entrez le prénom"
              />
              {errors.firstname && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastname">Nom</Label>
              <Input
                id="lastname"
                {...register("lastname")}
                className="mt-1.5"
                placeholder="Entrez le nom"
              />
              {errors.lastname && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Genre</Label>
              <Select
                defaultValue="Homme"
                onValueChange={(value) =>
                  setValue("gender", value as "Homme" | "Femme")
                }
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Homme">Homme</SelectItem>
                  <SelectItem value="Femme">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maritalstatus">Statut</Label>
              <Select
                defaultValue="C"
                onValueChange={(value) =>
                  setValue("maritalstatus", value as "M" | "C")
                }
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">Célibataire</SelectItem>
                  <SelectItem value="M">Marié(e)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthday">Date de naissance</Label>
                <Input
                  id="birthday"
                  type="date"
                  {...register("birthday")}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={age}
                  readOnly
                  disabled
                  className="mt-1.5 bg-muted"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DONNÉES DE CONTACT Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-primary">
            DONNÉES DE CONTACT
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="mobile">Téléphone</Label>
              <Input
                id="mobile"
                {...register("mobile")}
                className="mt-1.5"
                placeholder="+32..."
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1.5"
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                {...register("address")}
                className="mt-1.5"
                placeholder="Rue, numéro, code postal, ville"
              />
            </div>

            <div>
              <Label htmlFor="notes">Note sur le client</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                className="mt-1.5 min-h-[140px] resize-none"
                placeholder="Ajoutez des notes..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full max-w-md border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          onClick={() => router.push("/")}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          size="lg"
          className="w-full max-w-md bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
